import { Router } from "express";

import ItemController from "../controllers/item.controller";

export default class ItemRoute {
  public path: string;
  public router: Router;
  public itemController: ItemController;

  constructor() {
    this.path = "/items";
    this.router = Router();
    this.itemController = new ItemController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}`, this.itemController.createItem);
    this.router.get(`${this.path}`, this.itemController.getItems);
    this.router.get(`${this.path}/:itemId`, this.itemController.getItem);
    this.router.delete(`${this.path}/:itemId`, this.itemController.deleteItem);
  }
}
