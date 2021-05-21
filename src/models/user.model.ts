import { Length, IsString, Matches } from "class-validator";

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
}
