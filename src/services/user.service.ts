import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { FirebaseFirestore } from "@firebase/firestore-types";

import db from "../firebase/db";
import UserModel from "../models/user.model";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";

export default class UserService {
  public usersCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  public carrierCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.usersCollection = db.collection("users");
    this.carrierCollection = db.collection("carriers");
  }

  async getUser(userId: string) {
    const user = (await this.usersCollection.doc(userId).get()).data();

    if (user) return user;
    else throw new HttpException(400, "No such user found", null);
  }

  async getUsers() {
    const users: any = [];
    const snapshot = await this.usersCollection.get();

    snapshot.forEach((doc: any) => {
      users.push({ [doc.id]: doc.data() });
    });

    return users;
  }

  async createUser(user: UserModel) {
    // TODO validation logic should be implemented

    const userInstace = plainToClass(UserModel, user);

    const errors: ValidationError[] = await validate(userInstace);

    if (errors.length > 0)
      throw new HttpException(
        400,
        "Invalid data provided",
        getBodyErrors(errors, false)
      );

    // Check if carrier exists
    const carrier = (
      await this.carrierCollection.doc(userInstace.mobile.carrierId).get()
    ).data();
    if (!carrier) return new HttpException(400, "No such carrier found", null);

    const createdUser = await this.usersCollection.doc().set(user);
    return createdUser;
  }
}
