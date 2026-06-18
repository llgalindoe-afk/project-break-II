import express from "express"
import { authenticate } from "../middlewares/authenticate.js"
import { requireRole } from "../middlewares/requireRole.js"

const router = express.Router()

// GET /api/products (Public)
router.get("/api/products", (req, res) => {
  res.json({
    ok: true,
    message: "Listado de productos",
    data: [],
  })
})

// POST /api/products (Admin Only)
router.post(
  "/api/products",
  authenticate,
  requireRole("admin"),
  (req, res) => {
    res.status(201).json({
      ok: true,
      message: "Producto creado con éxito",
    })
  },
)

// PUT /api/products/:id (Admin Only)
router.put(
  "/api/products/:id",
  authenticate,
  requireRole("admin"),
  (req, res) => {
    res.json({
      ok: true,
      message: `Producto ${req.params.id} actualizado con éxito`,
    })
  },
)

// DELETE /api/products/:id (Admin Only)
router.delete(
  "/api/products/:id",
  authenticate,
  requireRole("admin"),
  (req, res) => {
    res.json({
      ok: true,
      message: `Producto ${req.params.id} eliminado con éxito`,
    })
  },
)

export default router
