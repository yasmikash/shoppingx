import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

import fbApp from "../firebase/app";
import UserModel from "../models/user.model";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";

const { db, auth } = fbApp;
export default class UserService {
  public usersCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  public carrierCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.usersCollection = db.collection("users");
    this.carrierCollection = db.collection("carriers");
  }

  async getUser(userId: string) {
    // Check if the user is available
    await auth.getUser(userId);

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
    const userInstace = plainToClass(UserModel, user);

    const errors: ValidationError[] = await validate(userInstace);

    if (errors.length > 0)
      throw new HttpException(
        400,
        "Invalid data provided",
        getBodyErrors(errors, false)
      );

    // Check if the user is available
    await auth.getUser(user.uid);

    const createdUser = await this.usersCollection.doc(user.uid).set(user);
    return createdUser;
  }

  async assigAddress() {}
}
