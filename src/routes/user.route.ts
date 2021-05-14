import { Router } from "express";

import UserController from "../controllers/user.controller";

export default class UserRoute {
  public path: string;
  public router: Router;
  public userController: UserController;

  constructor() {
    this.path = "/users";
    this.router = Router();
    this.userController = new UserController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.get(`${this.path}/:userId`, this.userController.getUser);
    this.router.post(`${this.path}`, this.userController.createUser);
  }
}
