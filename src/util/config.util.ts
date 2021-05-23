import path from "path";
interface Config {
  storageBucket: string;
  uploadPath: string;
  cloudPublicUrlPath: string;
}

const configObj: Config = {
  storageBucket: "shoppingx.appspot.com",
  uploadPath: path.join(__dirname, "../", "tempUploads"),
  cloudPublicUrlPath: "https://storage.googleapis.com/shoppingx.appspot.com",
};

export default configObj;
