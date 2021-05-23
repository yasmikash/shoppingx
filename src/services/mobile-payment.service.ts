import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" /*credentials: {}*/ });

import fbApp from "../firebase/app";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";
import CartModel from "../models/cart.model";

const { db } = fbApp;

export default class MobilePaymentService {
  public cartCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.cartCollection = db.collection("carts");
  }

  async createPayment(cart: CartModel) {
    const cartInstance = plainToClass(CartModel, cart);

    const errors: ValidationError[] = await validate(cartInstance);

    if (errors.length > 0)
      throw new HttpException(
        400,
        "Invalid data provided",
        getBodyErrors(errors, false)
      );

    // TODO Check if number exists for the user

    const snsMessage = new AWS.SNS({
      apiVersion: "2010-03-31",
    }).publish({
      Message:
        "[ShoppingX] Dear Nithya, a payment of 200.00 USD has been successfully charged from your account. Thanks for shopping with ShppingX",
      PhoneNumber: "+94766664935",
      MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: "ShoppingX",
        },
      },
    });

    snsMessage.send((err, data) => {
      console.log(err, data);
    });

    // if (charge.status !== "succeeded")
    //   throw new HttpException(400, "Card payment error", null);

    // card.cart.amount = amount;
    // card.cart.receipt = charge.receipt_url;

    // await this.cartCollection.doc().set(card);
    // return card;
  }
}
