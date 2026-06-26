import express from "express"
import { reviewController } from "../controllers/review.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js"

const router = express.Router()

// GET /api/products/:id/reviews (Público)
router.get("/api/products/:id/reviews", reviewController.getProductReviews)

// POST /api/products/:id/reviews (Protegido)
router.post("/api/products/:id/reviews", authMiddleware, reviewController.addProductReview)

export default router
