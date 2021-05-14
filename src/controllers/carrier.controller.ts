import { Request, Response, NextFunction } from "express";

import CarrierService from "../services/carrier.service";
const carrierService = new CarrierService();

export default class CategoryController {
  async createItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const carrier = await carrierService.createCarrier(req.body);
      res.status(201).json(carrier);
    } catch (error) {
      next(error);
    }
  }
}
