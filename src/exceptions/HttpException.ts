import BodyError from "../interfaces/body-error.interface";

export default class HttpException extends Error {
  public status: number;
  public message: string;
  public bodyErrors: BodyError[] | null;

  constructor(status: number, message: string, bodyErrors: BodyError[] | null) {
    super(message);
    this.status = status;
    this.message = message;
    this.bodyErrors = bodyErrors;
  }
}
