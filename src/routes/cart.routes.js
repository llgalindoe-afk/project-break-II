import express from "express"
import { authMiddleware } from "../../middlewares/auth.middleware.js"
import {
  getCartController,
  getCartByIdController,
  addItemController,
  checkoutController,
  removeItemController,
} from "../controllers/cart.controller.js"

const router = express.Router()

router.get("/", authMiddleware, getCartController)
router.get("/:cartId", authMiddleware, getCartByIdController)
router.post("/items", authMiddleware, addItemController)
router.delete("/items/:itemID", authMiddleware, removeItemController)
router.post("/checkout", authMiddleware, checkoutController)

export default router