import { IsString, Length } from "class-validator";

export default class ItemCategoryModel {
  @IsString()
  @Length(2)
  public categoryName: string;
}
