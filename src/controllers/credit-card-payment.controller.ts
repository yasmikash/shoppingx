import { Request, Response, NextFunction } from "express";

import CreditCardPaymentService from "../services/credit-card-payment.service";
const creditCardPaymentService = new CreditCardPaymentService();

export default class CreditCardPaymentController {
  async createPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await creditCardPaymentService.createPayment(req.body);
      res.status(200).json({ msg: "OK" });
    } catch (error) {
      next(error);
    }
  }
}
