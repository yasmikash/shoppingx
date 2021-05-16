import fb, { database } from "firebase-admin";
const serviceAccount = require("./key.json");

interface FirebaseApp {
  db: FirebaseFirestore.Firestore;
  auth: fb.auth.Auth;
}

const initializeFbApp = () => {
  fb.initializeApp({
    credential: fb.credential.cert(serviceAccount),
    storageBucket: "shoppingx.appspot.com",
  });

  fb.auth();
  const fbApp: FirebaseApp = {
    db: fb.firestore(),
    auth: fb.auth(),
  };

  return fbApp;
};

export default initializeFbApp();
