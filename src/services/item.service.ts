import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { v4 } from "uuid";

import fbApp from "../firebase/app";
import ItemModel from "../models/item.model";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";
import configObj from "../util/config.util";

const { db, storage } = fbApp;
export default class ItemService {
  public itemsCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  public categoryCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.itemsCollection = db.collection("items");
    this.categoryCollection = db.collection("categories");
  }

  //TODO Change files type
  async createItem(item: ItemModel, files: any) {
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

    // Check if images are being uploaded
    if (!files)
      throw new HttpException(
        400,
        "One or more images of the item should be uploaded",
        null
      );
    const fileNames = Object.keys(files);
    const itemImages: string[] = [];

    for (let i = 0; i < fileNames.length; i++) {
      const file = files[fileNames[i]];
      if (file.mimetype !== "image/jpeg")
        throw new HttpException(400, `${file.name} has invalid mimetype`, null);
      const fileToken = v4();
      const filePath = `${configObj.uploadPath}/${fileToken}.jpg`;
      await file.mv(filePath);
      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: fileToken,
        },
        contentType: "image/jpeg",
        cacheControl: "public, max-age=31536000",
      };
      await storage.bucket().upload(filePath, { gzip: true, metadata });
      itemImages.push(`${configObj.cloudPublicUrlPath}/${fileToken}.jpg`);
    }

    item.images = itemImages;
    const createdItem = await this.itemsCollection.doc().set(item);
    return createdItem;
  }

  async getItems() {
    const items: any = [];
    const snapshot = await this.itemsCollection.get();

    snapshot.forEach((doc: any) => {
      const obj = doc.data();
      obj.id = doc.id;
      items.push(obj);
    });

    return items;
  }

  async getItemsByCategory(categoryId: string) {
    const items: any = [];
    const snapshot = await this.itemsCollection.get();

    snapshot.forEach((doc: any) => {
      const obj = doc.data();
      if (obj.categoryId === categoryId) {
        obj.id = doc.id;
        items.push(obj);
      }
    });

    return items;
  }

  async getItem(itemId: string) {
    const user = (await this.itemsCollection.doc(itemId).get()).data();

    if (user) return user;
    else throw new HttpException(400, "No such item found", null);
  }

  async deleteItem(itemId: string) {
    const response = await this.itemsCollection.doc(itemId).delete();
    return response;
  }
}
