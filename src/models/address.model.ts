import { IsString, Length } from "class-validator";

export default class AddressModel {
  @IsString()
  @Length(2)
  public addressLine1: string;

  @IsString()
  @Length(2)
  public addressLine2: string;

  @IsString()
  @Length(2)
  public city: string;

  @IsString()
  @Length(2)
  public state: string;

  @IsString()
  @Length(2)
  public province: string;

  @IsString()
  @Length(2)
  public zip: number;

  @IsString()
  @Length(2)
  public country: string;
}
