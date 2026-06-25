import express from "express"
import { productController } from "../controllers/product.controller.js"
import { authenticate } from "../../middlewares/authenticate.js"
import { requireRole } from "../../middlewares/requireRole.js"

const router = express.Router()

// GET /api/products (Public)
router.get("/api/products", productController.getProducts)

// GET /api/products/:id (Public)
router.get("/api/products/:id", productController.getProductById)

// POST /api/products (Admin Only)
router.post(
  "/api/products",
  authenticate,
  requireRole("admin"),
  productController.createProduct,
)

// PUT /api/products/:id (Admin Only)
router.put(
  "/api/products/:id",
  authenticate,
  requireRole("admin"),
  productController.updateProduct,
)

// DELETE /api/products/:id (Admin Only)
router.delete(
  "/api/products/:id",
  authenticate,
  requireRole("admin"),
  productController.deleteProduct,
)

export default router
