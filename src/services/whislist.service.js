import { Wishlist } from "../../models/whislist.model.js"
import prisma from "../lib/prisma.js"

const getWishlistProducts = async (userId) => {
  const wishlist = await Wishlist.findOne({ userId: parseInt(userId) })
  
  if (!wishlist || !wishlist.products || wishlist.products.length === 0) {
    return []
  }

  // Recuperamos la información completa de cada producto favorito desde Supabase
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: wishlist.products,
      },
    },
  })

  return products
}

const toggleWishlistProduct = async (userId, productId) => {
  const pId = parseInt(productId)
  const uId = parseInt(userId)

  let wishlist = await Wishlist.findOne({ userId: uId })

  if (!wishlist) {
    wishlist = new Wishlist({
      userId: uId,
      products: [pId],
    })
    await wishlist.save()
    return {
      message: "Producto añadido a favoritos",
      inWishlist: true,
    }
  }

  const index = wishlist.products.indexOf(pId)

  if (index > -1) {
    // Si ya existe, lo eliminamos de favoritos (toggle off)
    wishlist.products.splice(index, 1)
    wishlist.updatedAt = new Date()
    await wishlist.save()
    return {
      message: "Producto eliminado de favoritos",
      inWishlist: false,
    }
  } else {
    // Si no existe, lo agregamos a favoritos (toggle on)
    wishlist.products.push(pId)
    wishlist.updatedAt = new Date()
    await wishlist.save()
    return {
      message: "Producto añadido a favoritos",
      inWishlist: true,
    }
  }
}

export const wishlistService = {
  getWishlistProducts,
  toggleWishlistProduct,
}
