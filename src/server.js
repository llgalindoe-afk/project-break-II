import app from "./app.js"
import {dbConnection} from "../config/mongo.js"
import "dotenv/config"

const PORT = process.env.PORT || 3000
  await dbConnection()
app.listen(PORT, () => {
  console.log(`🔐 Auth API corriendo en http://localhost:${PORT}`)
  console.log(`POST /login  |  POST /logout  |  GET /profile  |  GET /admin`)
  console.log(`🛒 Cart API en http://localhost:${PORT}`)
  console.log(`   GET  /api/cart           → ver carrito`)
  console.log(`   POST /api/cart/items     → añadir producto`)
  console.log(`   POST /api/cart/checkout  → checkout`)
})
