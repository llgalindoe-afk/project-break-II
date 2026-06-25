import { productService } from "../services/product.service.js"

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts()
    res.json({
      ok: true,
      success: true,
      data: products,
    })
  } catch (error) {
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "El ID del producto debe ser un número válido",
      })
    }

    const product = await productService.getProductById(id)
    if (!product) {
      return res.status(404).json({
        ok: false,
        success: false,
        error: "Producto no encontrado",
      })
    }

    res.json({
      ok: true,
      success: true,
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body
    if (!name || price === undefined) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "El nombre y el precio son campos obligatorios",
      })
    }

    const product = await productService.createProduct(req.body)
    res.status(201).json({
      ok: true,
      success: true,
      message: "Producto creado con éxito",
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "El ID del producto debe ser un número válido",
      })
    }

    const product = await productService.updateProduct(id, req.body)
    res.json({
      ok: true,
      success: true,
      message: "Producto actualizado con éxito",
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({
        ok: false,
        success: false,
        error: "El ID del producto debe ser un número válido",
      })
    }

    await productService.deleteProduct(id)
    res.json({
      ok: true,
      success: true,
      message: "Producto eliminado con éxito",
    })
  } catch (error) {
    next(error)
  }
}

export const productController = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
