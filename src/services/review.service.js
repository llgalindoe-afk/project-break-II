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

export const reviewService = {
  createReview,
  getReviewsByProduct,
}
