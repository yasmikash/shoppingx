import { Router } from "express";

import CarrierController from "../controllers/carrier.controller";

export default class CarrierRoute {
  public path: string;
  public router: Router;
  public carrierController: CarrierController;

  constructor() {
    this.path = "/carriers";
    this.router = Router();
    this.carrierController = new CarrierController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.carrierController.getCarriers);
    this.router.post(`${this.path}`, this.carrierController.createCarrier);
  }
}
