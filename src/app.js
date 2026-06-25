import express from "express"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"

// Importar rutas
import moviesRouter from "./routes/movies.js"
import authRouter from "./routes/authRoutes.js"
import cartRouter from "./routes/cart.routes.js"
import productsRouter from "./routes/products.routes.js"

// Importar middlewares (desde la raíz del proyecto)
import { logger } from "../middlewares/logger.middleware.js"
import { notFound } from "../middlewares/notFound.js"
import { errorHandler } from "../middlewares/errorHandler.js"

dotenv.config()

// Validar variables críticas obligatorias
if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR FATAL: JWT_SECRET no está definido en el archivo .env")
  process.exit(1)
}

const app = express()

// Middlewares globales de seguridad y utilidades
app.use(helmet())

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : "*",
  credentials: true,
}
app.use(cors(corsOptions))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 peticiones
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Demasiadas peticiones desde esta IP, por favor inténtalo de nuevo después de 15 minutos."
  }
})
app.use(limiter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Logger middleware (ejecutado antes de las rutas)
app.use(logger)

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API Crud completo activa",
  })
})

// Rutas de la API
app.use("/api/auth", authRouter)
app.use("/api/cart", cartRouter)
app.use(productsRouter)
app.use("/api/movies", moviesRouter)

// Manejo de errores
app.use(notFound)
app.use(errorHandler)

export default app
