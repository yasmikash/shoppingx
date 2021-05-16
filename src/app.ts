require("reflect-metadata");

import express, { Application } from "express";
import cors from "cors";

import Route from "./interfaces/route.interface";
import errorMiddleware from "./middlewares/error.middleware";

export default class App {
  public app: Application;
  public port: string | number;
  public env: string;
  public db: any;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.env = process.env.NODE_ENV || "development";

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  initializeMiddlewares() {
    // TODO set up any possible logic specific to different evironments
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
