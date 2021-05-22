import { Request, Response, NextFunction } from "express";

import UserService from "../services/user.service";
const userService = new UserService();

export default class UserController {
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await userService.getUser(req.params.userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await userService.createUser(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async assignAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await userService.assigAddress(req.params.userId, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async assignMobile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await userService.assigMobile(req.params.userId, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
