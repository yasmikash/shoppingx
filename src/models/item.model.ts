import { IsNumber, IsString, Length } from "class-validator";

export default class ItemModel {
  @IsString()
  @Length(5)
  public categoryId: string;

  @IsString()
  @Length(2)
  public itemName: string;

  @IsNumber()
  public price: number;
}
