import { IsString, Length } from "class-validator";

type PaymentType = "card" | "mobile";
export default class CartModel {
  @IsString()
  @Length(2)
  public userId: string;

  @IsString({ each: true })
  public items: string[];

  public receipt: string | null;

  public amount: number;

  public type: PaymentType;
}
