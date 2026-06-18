import express from "express"
import { authController } from "../controllers/auth.js"
import { authenticate } from "../middlewares/authenticate.js"
import { requireRole } from "../middlewares/requireRole.js"

const router = express.Router()

// Ruta pública
router.post("/login", authController.login)
router.post("/api/auth/login", authController.login)
router.post("/api/auth/register", authController.register)
// Rutas protegidas
router.get("/profile", authenticate, authController.getProfile)
router.post("/logout", authController.logout)
// Ruta restringida por rol
router.get(
  "/admin",
  authenticate,
  requireRole("admin"),
  authController.getAdmin,
)

export default router
