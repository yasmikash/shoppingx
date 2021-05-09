import BodyError from "../interfaces/body-error.interface";

export default class HttpException extends Error {
  public status: number;
  public message: string;
  public bodyErrors: BodyError[] | undefined;

  constructor(status: number, message: string, bodyErrors: BodyError[]) {
    super(message);
    this.status = status;
    this.message = message;
    this.bodyErrors = bodyErrors;
  }
}
