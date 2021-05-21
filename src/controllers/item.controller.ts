import { Request, Response, NextFunction } from "express";
import ItemModel from "../models/item.model";

import ItemService from "../services/item.service";
const itemService = new ItemService();

export default class UserController {
  async createItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: ItemModel = req.body;
      const user = await itemService.createItem(
        {
          ...data,
          price: parseFloat(data.price.toString()),
          quantity: parseFloat(data.quantity.toString()),
        },
        req.files
      );
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
