import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { FirebaseFirestore } from "@firebase/firestore-types";

import db from "../firebase/db";
import ItemModel from "../models/item.model";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";

export default class ItemService {
  public itemsCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  public categoryCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.itemsCollection = db.collection("items");
    this.categoryCollection = db.collection("categories");
  }

  async createItem(item: ItemModel) {
    const itemInstace = plainToClass(ItemModel, item);

    const errors: ValidationError[] = await validate(itemInstace);

    if (errors.length > 0)
      throw new HttpException(
        400,
        "Invalid data provided",
        getBodyErrors(errors, false)
      );

    // Check if carrier exists
    const category = (
      await this.categoryCollection.doc(itemInstace.categoryId).get()
    ).data();
    if (!category) throw new HttpException(400, "No such category found", null);

    const createdItem = await this.itemsCollection.doc().set(item);
    return createdItem;
  }
}
