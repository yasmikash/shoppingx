import { Type } from "class-transformer";
import {
  Length,
  IsEmail,
  ValidateNested,
  IsString,
  Matches,
} from "class-validator";
import AddressModel from "./address.model";
import MobileModel from "./mobile.model";

type UserType = "buyer" | "seller";
export default class UserModel {
  @IsString()
  @Length(4)
  public uid: string;

  @Matches(/seller|buyer/)
  public userType: UserType;

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
