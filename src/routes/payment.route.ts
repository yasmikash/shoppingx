import { Router } from "express";

import CreditCardPaymentController from "../controllers/credit-card-payment.controller";

export default class CarrierRoute {
  public path: string;
  public router: Router;
  public creditCardPaymentController: CreditCardPaymentController;

  constructor() {
    this.path = "/payments";
    this.router = Router();
    this.creditCardPaymentController = new CreditCardPaymentController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}/card`,
      this.creditCardPaymentController.createPayment
    );
  }
}
