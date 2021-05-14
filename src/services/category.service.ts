import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { FirebaseFirestore } from "@firebase/firestore-types";

import db from "../firebase/db";
import Category from "../models/item-category.model";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";

export default class CatregoryService {
  public categoryCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.categoryCollection = db.collection("categories");
  }

  async getCategories() {
    const categories: any = [];
    const snapshot = await this.categoryCollection.get();

    snapshot.forEach((doc: any) => {
      categories.push({ [doc.id]: doc.data() });
    });

    return categories;
  }

  async createCategory(category: Category) {
    // TODO validation logic should be implemented

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
