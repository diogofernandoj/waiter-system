import { Router } from "express";
import multer from "multer";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { UserInfoController } from "./controllers/user/UserInfoController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrdersController";
import { OrderDetailsController } from "./controllers/order/OrderDetailsController";
import { CompleteOrderController } from "./controllers/order/CompleteOrderController";

import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// ROTAS USER
router.post("/users", new CreateUserController().handle);

router.post("/login", new AuthUserController().handle);

router.get("/me", isAuthenticated, new UserInfoController().handle);

// ROTAS CATEGORY
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

router.get(
  "/categories",
  isAuthenticated,
  new ListCategoriesController().handle
);

// ROTAS PRODUCT
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/products",
  isAuthenticated,
  new ListByCategoryController().handle
);

// ROTAS ORDER
router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new DeleteOrderController().handle);

router.post("/order/add", isAuthenticated, new AddItemController().handle);
router.delete(
  "/order/remove",
  isAuthenticated,
  new RemoveItemController().handle
);

router.put("/order/send", isAuthenticated, new SendOrderController().handle);

router.get("/orders", isAuthenticated, new ListOrderController().handle);

router.get(
  "/order/details",
  isAuthenticated,
  new OrderDetailsController().handle
);

router.put(
  "/order/complete",
  isAuthenticated,
  new CompleteOrderController().handle
);

export { router };
