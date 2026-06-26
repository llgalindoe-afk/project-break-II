import { wishlistService } from "../services/whislist.service.js"

const getUserWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id
    const products = await wishlistService.getWishlistProducts(userId)
    
    res.json({
      ok: true,
      success: true,
      data: products,
    })
  } catch (error) {
    next(error)
  }
}

const toggleWishlistItem = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId)
    if (isNaN(productId)) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "El ID del producto debe ser un número válido",
      })
    }

    const userId = req.user.id
    const result = await wishlistService.toggleWishlistProduct(userId, productId)

    res.json({
      ok: true,
      success: true,
      message: result.message,
      data: {
        inWishlist: result.inWishlist,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const wishlistController = {
  getUserWishlist,
  toggleWishlistItem,
}
