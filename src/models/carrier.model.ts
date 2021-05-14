import { IsString, Length } from "class-validator";

export default class CarrierModel {
  @IsString()
  @Length(2)
  public carrierName: string;
}
