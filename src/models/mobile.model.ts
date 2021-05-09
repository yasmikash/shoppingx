import { IsNumber, IsPhoneNumber, IsString, Length } from "class-validator";

export default class Mobile {
  @IsString()
  @Length(2)
  public carrier: string;

  @IsString()
  @Length(10)
  public mobileNumber: number;
}
