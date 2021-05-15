import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { FirebaseFirestore } from "@firebase/firestore-types";

import db from "../firebase/db";
import Carrier from "../models/carrier.model";
import getBodyErrors from "../util/body-error.util";
import HttpException from "../exceptions/HttpException";

export default class CarrierService {
  public carrierCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.carrierCollection = db.collection("carriers");
  }

  async getCarriers() {
    const carriers: any = [];
    const snapshot = await this.carrierCollection.get();

    snapshot.forEach((doc: any) => {
      carriers.push({ [doc.id]: doc.data() });
    });

    return carriers;
  }

  async createCarrier(carrier: Carrier) {
    const carrierInstace = plainToClass(Carrier, carrier);

    const errors: ValidationError[] = await validate(carrierInstace);

    if (errors.length > 0)
      throw new HttpException(
        400,
        "Invalid data provided",
        getBodyErrors(errors, false)
      );

    const createdCarrier = await this.carrierCollection.doc().set(carrier);
    return createdCarrier;
  }
}
