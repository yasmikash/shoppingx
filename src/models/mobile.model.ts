import { IsString, Length } from "class-validator";

export default class Mobile {
  @IsString()
  @Length(2)
  public carrierId: string;

  @IsString()
  @Length(10)
  public mobileNumber: string;
}
