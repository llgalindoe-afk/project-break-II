import prisma from "../lib/prisma.js"

const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: { id: "asc" },
  })
}

const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id },
  })
}

const createProduct = async (data) => {
  return prisma.product.create({
    data: {
      name: data.name,
      description: data.description || null,
      price: parseFloat(data.price),
      imageUrl: data.imageUrl || null,
    },
  })
}

const updateProduct = async (id, data) => {
  const updateData = {}
  if (data.name !== undefined) updateData.name = data.name
  if (data.description !== undefined) updateData.description = data.description
  if (data.price !== undefined) updateData.price = parseFloat(data.price)
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl

  return prisma.product.update({
    where: { id },
    data: updateData,
  })
}

const deleteProduct = async (id) => {
  return prisma.product.delete({
    where: { id },
  })
}

export const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
