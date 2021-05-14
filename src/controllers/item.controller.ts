import { Request, Response, NextFunction } from "express";

import ItemService from "../services/item.service";
const itemService = new ItemService();

export default class UserController {
  async createItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await itemService.createItem(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
