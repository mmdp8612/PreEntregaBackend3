import { Router } from "express";
import { 
    getAllProducts, 
    getProductById, 
    postProduct, 
    updateProduct, 
    deleteProduct 
} from "../controllers/products.controller.js";
import { verifyAuthenticateToken, isAdmin } from "../middlewares/auth.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", [verifyAuthenticateToken, isAdmin], postProduct);
router.put("/:id", [verifyAuthenticateToken, isAdmin], updateProduct);
router.delete("/:id", [verifyAuthenticateToken, isAdmin], deleteProduct);

export default router;