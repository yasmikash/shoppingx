import { Router } from "express";

import CategoryController from "../controllers/category.controller";

export default class CategoryRoute {
  public path: string;
  public router: Router;
  public categoryController: CategoryController;

  constructor() {
    this.path = "/categories";
    this.router = Router();
    this.categoryController = new CategoryController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.categoryController.getCategories);
    this.router.post(`${this.path}`, this.categoryController.createCategory);
  }
}
