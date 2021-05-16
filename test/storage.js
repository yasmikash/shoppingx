const fs = require("firebase-admin");
const serviceAccount = require("../src/firebase/key.json");

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
  storageBucket: "shoppingx.appspot.com",
});

const bucket = fs.storage().bucket();

const file = "./wallpaper.jpg";

const metadata = {
  metadata: {
    // This line is very important. It's to create a download token.
    firebaseStorageDownloadTokens: "iuwdwd6w8e7dweudhweudhwefwefwef",
  },
  contentType: "image/png",
  cacheControl: "public, max-age=31536000",
};

bucket
  .upload(file, {
    gzip: true,
    metadata: metadata,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
