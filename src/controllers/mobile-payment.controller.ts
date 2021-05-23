import { Request, Response, NextFunction } from "express";

import MobilePaymentService from "../services/mobile-payment.service";
const mobilePaymentService = new MobilePaymentService();

export default class MovilePaymentController {
  async createPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cart = await mobilePaymentService.createPayment(req.body);
      res.status(201).json(cart);
    } catch (error) {
      next(error);
    }
  }
}
