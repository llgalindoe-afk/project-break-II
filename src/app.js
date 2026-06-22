import express from "express"
import moviesRouter from "./routes/movies.js"
import { logger } from './middlewares/logger.middleware.js'
import { notFound } from "./middlewares/notFound.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import authRouter from "./routes/authRoutes.js"
import cartRouter from "./routes/cart.js"
import productsRouter from "./routes/products.routes.js"
import dotenv from 'dotenv';
dotenv.config();
// Validar variables críticas obligatorias
if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR FATAL: JWT_SECRET no está definido en el archivo .env');
  process.exit(1); // El código 1 indica que el proceso terminó debido a un error
}

const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : "*",
  credentials: true,
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    ok: false,
    error: "Demasiadas peticiones desde esta IP, por favor inténtalo de nuevo después de 15 minutos."
  }
})

app.use(express.json())
app.use("/movies", moviesRouter)
app.use(logger) // ANTES de las rutas
app.use('/api/movies', moviesRouter)
app.use(notFound)
app.use(errorHandler)
app.use('/api/auth', authRouter)

app.get("/", (req, res) => {
  res.json({
    message: "API Crud completo activa",
app.use(helmet())
app.use(cors(corsOptions))
app.use(limiter)

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/authRouter)
app.use("/api/cart", cartRouter)
  app.use(productsRouter)

export default app
