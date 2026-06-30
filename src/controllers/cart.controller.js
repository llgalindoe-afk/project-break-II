import { getCart, getCartById, addItem, checkout, removeItem } from "../services/cart.service.js"

export const getCartController = async (req, res) => {
  try {
    const cart = await getCart(req.user.id)
    res.json({
      ok: true,
      data: cart,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}

export const getCartByIdController = async (req, res) => {
  try {
    const cart = await getCartById(req.params.cartId)
    res.json({
      ok: true,
      data: cart,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}

export const addItemController = async (req, res) => {
  try {
    const { productId, quantity } = req.body

    if (!productId || !quantity) {
      return res.status(400).json({
        ok: false,
        error: "productId y quantity son obligatorios",
      })
    }

    const item = await addItem(req.user.id, productId, quantity)
    res.status(201).json({
      ok: true,
      data: item,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}

export const checkoutController = async (req, res) => {
  try {
    const order = await checkout(req.user.id)
    res.json({
      ok: true,
      data: order,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}

export const removeItemController = async (req, res) => {
  try {
    const cartItemId = parseInt(req.params.itemID)
    if (isNaN(cartItemId)) {
      return res.status(400).json({
        ok: false,
        error: "El ID del item debe ser un número válido",
      })
    }

    await removeItem(req.user.id, cartItemId)
    res.json({
      ok: true,
      message: "Item eliminado del carrito con éxito",
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}