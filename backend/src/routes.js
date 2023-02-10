import {Router} from 'express';
// import * as bookController from "./controllers/books.js"
import * as adminController from "./controllers/adminController.js";
import * as userController from "./controllers/userController.js";
import * as productController from "./controllers/productController.js";
import * as orderController from "./controllers/orderController.js";
import addAdminSchema from "./schemas/addAdmin.js";
import addUserSchema from "./schemas/addUser.js";
import addProductSchema from "./schemas/addProduct.js";
import editProductSchema from "./schemas/editProduct.js";
import editUserSchema from "./schemas/editUser.js";
import editAdminSchema from "./schemas/editAdmin.js";
import { validateBody } from './middleware/validation.js';
import authenticate from './middleware/authenticate.js';
import * as dotenv from "dotenv";
dotenv.config({path : '.env'});

console.log("router",process.env.PORT)

const router = Router();

router.get('/',adminController.getAllAdmins)

router.post('/login',adminController.login)

router.post('/register',validateBody(addAdminSchema),adminController.registerAdmin)

router.put('/:adminIdentifier',validateBody(editAdminSchema),adminController.updateAdmin)

router.delete('/:adminIdentifier',adminController.deleteAdmin)

router.post('/userLogin',userController.login)

router.post('/userRegister',validateBody(addUserSchema),userController.registerUser)

router.get("/users", userController.getAllUsers);

router.put('/users/:userIdentifier',authenticate,validateBody(editUserSchema),userController.updateUser)

router.delete('/users/:userIdentifier',authenticate,userController.deleteUser)

router.get("/users/:id", userController.getUserDetails);

router.post("/userRegister/checkout", userController.checkoutUser);

router.get("/products", productController.getAllProducts);

router.post(
    "/products",
    authenticate,
    validateBody(addProductSchema),
    productController.createProduct
  );
  router.get("/products/:id",productController.getProductDetails);

  router.put("/products/:id",authenticate,validateBody(editProductSchema),productController.updateProduct);

  router.delete("/products/:id", authenticate,productController.deleteProduct);

  router.get("/orders/:id", orderController.getAllOrders);

  router.post("/orders/:id", orderController.createOrders);

  router.delete("/orders/:id", orderController.deleteOrder);


export default router;