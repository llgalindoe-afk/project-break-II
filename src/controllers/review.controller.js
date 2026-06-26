import { reviewService } from "../services/review.service.js"

const getProductReviews = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id)
    if (isNaN(productId)) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "El ID del producto debe ser un número válido",
      })
    }

    const reviews = await reviewService.getReviewsByProduct(productId)
    res.json({
      ok: true,
      success: true,
      data: reviews,
    })
  } catch (error) {
    next(error)
  }
}

const addProductReview = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id)
    if (isNaN(productId)) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "El ID del producto debe ser un número válido",
      })
    }

    const { rating, comment } = req.body
    if (rating === undefined || !comment) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "El rating (calificación) y el comentario son campos obligatorios",
      })
    }

    const parsedRating = parseInt(rating)
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "El rating debe ser un número entero entre 1 y 5",
      })
    }

    const userId = req.user.id
    const userEmail = req.user.email

    const review = await reviewService.createReview(
      productId,
      userId,
      userEmail,
      parsedRating,
      comment,
    )

    res.status(201).json({
      ok: true,
      success: true,
      message: "Reseña añadida con éxito",
      data: review,
    })
  } catch (error) {
    next(error)
  }
}

export const reviewController = {
  getProductReviews,
  addProductReview,
}
