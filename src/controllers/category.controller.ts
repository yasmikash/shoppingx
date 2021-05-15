import { Request, Response, NextFunction } from "express";

import CategoryService from "../services/category.service";
const categoryService = new CategoryService();

export default class CategoryController {
  async getCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
}
