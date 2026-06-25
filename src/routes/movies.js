import express from "express"
import { moviesService } from "../services/movies.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const movies = await moviesService.getAllMovies()
    res.json({
      ok: true,
      data: movies,
    })
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ ok: false, error: "ID inválido" })
    }
    const movie = await moviesService.getMovieById(id)
    if (!movie) {
      return res.status(404).json({ ok: false, error: "Película no encontrada" })
    }
    res.json({ ok: true, data: movie })
  } catch (error) {
    next(error)
  }
})

export default router
