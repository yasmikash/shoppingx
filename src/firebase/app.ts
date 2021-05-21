import fb from "firebase-admin";
const serviceAccount = require("./key.json");
import configObj from "../util/config.util";
interface FirebaseApp {
  db: FirebaseFirestore.Firestore;
  auth: fb.auth.Auth;
  storage: fb.storage.Storage;
}

const initializeFbApp = () => {
  fb.initializeApp({
    credential: fb.credential.cert(serviceAccount),
    storageBucket: configObj.storageBucket,
  });

  fb.auth();
  const fbApp: FirebaseApp = {
    db: fb.firestore(),
    auth: fb.auth(),
    storage: fb.storage(),
  };

  return fbApp;
};

export default initializeFbApp();
