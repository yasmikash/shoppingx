import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

import fbApp from "../firebase/app";
import Category from "../models/item-category.model";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";

const { db } = fbApp;
export default class CategoryService {
  public categoryCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.categoryCollection = db.collection("categories");
  }

  async getCategories() {
    const categories: any = [];
    const snapshot = await this.categoryCollection.get();

    snapshot.forEach((doc: any) => {
      const obj = doc.data();
      obj.id = doc.id;
      categories.push(obj);
    });

    return categories;
  }

  async createCategory(category: Category) {
    const categoryInstace = plainToClass(Category, category);

    const errors: ValidationError[] = await validate(categoryInstace);

    if (errors.length > 0)
      throw new HttpException(
        400,
        "Invalid data provided",
        getBodyErrors(errors, false)
      );

    const createdCategory = await this.categoryCollection.doc().set(category);
    return createdCategory;
  }
}
