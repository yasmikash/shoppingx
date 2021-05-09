import { Type } from "class-transformer";
import { Length, IsEmail, ValidateNested, IsString } from "class-validator";
import AddressModel from "./address.model";
import MobileModel from "./mobile.model";

export default class UserModel {
  @IsString()
  @Length(4)
  username: string;

  @IsString()
  @Length(2)
  public firstName: string;

  @IsString()
  @Length(2)
  public lastName: string;

  @IsEmail()
  public email: string;

  @Type(() => MobileModel)
  @ValidateNested({ always: true })
  public mobile: MobileModel;

  @Type(() => AddressModel)
  @ValidateNested({ always: true })
  public address: AddressModel;
}
