import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

import fbApp from "../firebase/app";
import UserModel from "../models/user.model";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";
import AddressModel from "../models/address.model";
import MobileModel from "../models/mobile.model";

const { db, auth } = fbApp;
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

    user.address = null;
    user.mobile = null;
    const createdUser = await this.usersCollection.doc(user.uid).set(user);
    return createdUser;
  }

  async assigAddress(userId: string, address: AddressModel) {
    const addressInstance = plainToClass(AddressModel, address);

    const errors: ValidationError[] = await validate(addressInstance);

    if (errors.length > 0)
      throw new HttpException(
        400,
        "Invalid data provided",
        getBodyErrors(errors, false)
      );

    // Check if the user is available
    await auth.getUser(userId);

    const user: FirebaseFirestore.DocumentData | undefined = (
      await this.usersCollection.doc(userId).get()
    ).data();

    if (!user) throw new HttpException(400, "No such user found", null);

    user.address = address;
    const createdUser = await this.usersCollection.doc(user.uid).set(user);
    return createdUser;
  }

  async assigMobile(userId: string, mobile: MobileModel) {
    const mobileInstance = plainToClass(MobileModel, mobile);

    const errors: ValidationError[] = await validate(mobileInstance);

    if (errors.length > 0)
      throw new HttpException(
        400,
        "Invalid data provided",
        getBodyErrors(errors, false)
      );

    // Check if the user is available
    await auth.getUser(userId);

    const user: FirebaseFirestore.DocumentData | undefined = (
      await this.usersCollection.doc(userId).get()
    ).data();

    if (!user) throw new HttpException(400, "No such user found", null);

    user.mobile = mobile;
    const createdUser = await this.usersCollection.doc(user.uid).set(user);
    return createdUser;
  }
}
