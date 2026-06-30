import express from "express"
import { wishlistController } from "../controllers/wishlist.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js"

const router = express.Router()

// GET /api/wishlist (Protegido)
router.get("/api/wishlist", authMiddleware, wishlistController.getUserWishlist)
router.get("/api/whislist", authMiddleware, wishlistController.getUserWishlist)

// POST /api/wishlist/:productId (Protegido)
router.post("/api/wishlist/:productId", authMiddleware, wishlistController.toggleWishlistItem)
router.post("/api/whislist/:productId", authMiddleware, wishlistController.toggleWishlistItem)

export default router
