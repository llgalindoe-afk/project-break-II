import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Indice para buscar reseñas de un producto rápidamente
reviewSchema.index({ productId: 1 })

export const Review = mongoose.model("Review", reviewSchema)
