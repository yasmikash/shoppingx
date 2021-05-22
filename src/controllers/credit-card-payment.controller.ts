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
      const card = await creditCardPaymentService.createPayment(req.body);
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  }
}
