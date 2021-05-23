import { Router } from "express";

import CreditCardPaymentController from "../controllers/credit-card-payment.controller";
import MobilePaymentController from "../controllers/mobile-payment.controller";

export default class CarrierRoute {
  public path: string;
  public router: Router;
  public creditCardPaymentController: CreditCardPaymentController;
  public mobilePaymentControlelr: MobilePaymentController;

  constructor() {
    this.path = "/payments";
    this.router = Router();
    this.creditCardPaymentController = new CreditCardPaymentController();
    this.mobilePaymentControlelr = new MobilePaymentController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.path}/card`,
      this.creditCardPaymentController.createPayment
    );
    this.router.post(
      `${this.path}/mobile`,
      this.mobilePaymentControlelr.createPayment
    );
  }
}
