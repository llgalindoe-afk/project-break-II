import mongoose from "mongoose"

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  products: {
    type: [Number],
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export const Wishlist = mongoose.model("Wishlist", wishlistSchema)
