import { Length, IsString, Matches } from "class-validator";
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

  public address: AddressModel | null;

  public mobile: MobileModel | null;
}
