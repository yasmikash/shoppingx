import { Type } from "class-transformer";
import { IsEmail, IsString, Length, ValidateNested } from "class-validator";
import CartModel from "./cart.model";

export default class CreditCardPayment {
  @IsString()
  @Length(2)
  public cardName: string;

  @IsString()
  public cardNumber: string;

  @IsString()
  @Length(3)
  public cvc: string;

  @IsString()
  @Length(2)
  public expMonth: string;

  @IsString()
  @Length(4)
  public expYear: string;

  @IsEmail()
  public email: string;

  @IsString()
  @Length(2)
  public country: string;

  @ValidateNested()
  @Type(() => CartModel)
  public cart: CartModel;
}
