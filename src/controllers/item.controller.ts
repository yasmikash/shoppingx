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

  async getItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const items = await itemService.getItems();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  async getItemsByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const items = await itemService.getItemsByCategory(req.params.categoryId);
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  async getItemsByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const items = await itemService.getItemsByUser(req.params.userId);
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  async getItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const item = await itemService.getItem(req.params.itemId);
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await itemService.deleteItem(req.params.itemId);
      res.status(200);
    } catch (error) {
      next(error);
    }
  }
}
