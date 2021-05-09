import fs from "firebase-admin";
import { FirebaseFirestore } from "@firebase/firestore-types";
const serviceAccount = require("./key.json");

let db: FirebaseFirestore.Firestore | null = null;

const initializeDb = () => {
  fs.initializeApp({
    credential: fs.credential.cert(serviceAccount),
  });
  db = fs.firestore();
  return db;
};

export default initializeDb();
