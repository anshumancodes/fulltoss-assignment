import { Router } from "express";
import { getAllProducts, getProductById } from "../controllers/product.controller.js";

const router = Router();



router.route("/getAllProducts").get(getAllProducts);
router.route("/getProductById/:id").get(getProductById);


export default router;