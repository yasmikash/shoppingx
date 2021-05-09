import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import BodyError from "../interfaces/body-error.interface";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = error.status || 500;
  const message: string = error.message || "Something went wrong";
  const errors: BodyError[] | undefined = error.bodyErrors;

  res.status(status).json({ message, errors });
};

export default errorMiddleware;
