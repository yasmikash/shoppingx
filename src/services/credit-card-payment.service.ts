import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_peI9mUBWIIMgSGYTkMhZrlzP00eG714Wj2", {
  apiVersion: "2020-08-27",
});

import fbApp from "../firebase/app";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";
import CreditCardPaymentModel from "../models/credit-card-payment.model";

const { db, auth } = fbApp;

export default class CreditCardPaymentService {
  public cardCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.cardCollection = db.collection("cards");
  }

  async createPayment(card: CreditCardPaymentModel) {
    const cardInstance = plainToClass(CreditCardPaymentModel, card);

    const errors: ValidationError[] = await validate(cardInstance);

    if (errors.length > 0)
      throw new HttpException(
        400,
        "Invalid data provided",
        getBodyErrors(errors, false)
      );

    const cardToken = await stripe.tokens.create({
      card: {
        number: card.cardNumber,
        exp_month: card.expMonth,
        exp_year: card.expYear,
        cvc: card.cvc,
        address_country: card.country,
      },
    });

    const charge = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      source: cardToken.id,
      receipt_email: card.email,
      description: `Stripe Charge Of Amount 2000 for One Time Payment`,
    });

    if (charge.status !== "succeeded")
      throw new HttpException(400, "Card payment error", null);

    console.log(charge);
  }
}
