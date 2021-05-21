import { isArray, IsNumber, IsString, Length } from "class-validator";

export default class ItemModel {
  @IsString()
  @Length(5)
  public categoryId: string;

  @IsString()
  @Length(2)
  public name: string;

  @IsString()
  @Length(2)
  public description: string;

  @IsNumber()
  public quantity: number;

  @IsNumber()
  public price: number;

  public images: string[];
}
