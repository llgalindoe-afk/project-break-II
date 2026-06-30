import express from "express"
import { authController } from "../controllers/auth.controller.js"
import { authenticate } from "../../middlewares/authenticate.js"

const router = express.Router()

// GET /api/me (con Auth)
router.get("/api/me", authenticate, authController.getProfile)

export default router
