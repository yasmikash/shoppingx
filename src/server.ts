import App from "./app";
import UserRoute from "./routes/user.route";
import ItemRoute from "./routes/item.route";
import CategoryRoute from "./routes/category.route";
import CarrierRoute from "./routes/carrier.route";

const app = new App([
  new UserRoute(),
  new ItemRoute(),
  new CategoryRoute(),
  new CarrierRoute(),
]);

app.listen();
