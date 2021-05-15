import { Request, Response, NextFunction } from "express";

import CarrierService from "../services/carrier.service";
const carrierService = new CarrierService();

export default class CarrierController {
  async getCarriers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const carriers = await carrierService.getCarriers();
      res.status(200).json(carriers);
    } catch (error) {
      next(error);
    }
  }

  async createCarrier(
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
