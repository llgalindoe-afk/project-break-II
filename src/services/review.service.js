import { Review } from "../../models/review.model.js"

const createReview = async (productId, userId, userEmail, rating, comment) => {
  const review = new Review({
    productId: parseInt(productId),
    userId: parseInt(userId),
    userEmail,
    rating: parseInt(rating),
    comment,
  })

  return review.save()
}

const getReviewsByProduct = async (productId) => {
  return Review.find({ productId: parseInt(productId) }).sort({ createdAt: -1 })
}

const deleteReview = async (reviewId, userId, userRole) => {
  const review = await Review.findById(reviewId)

  if (!review) {
    throw new Error("La reseña no existe")
  }

  if (userRole !== "admin" && review.userId !== userId) {
    throw new Error("No tienes permiso para eliminar esta reseña")
  }

  return Review.findByIdAndDelete(reviewId)
}

export const reviewService = {
  createReview,
  getReviewsByProduct,
  deleteReview,
}
