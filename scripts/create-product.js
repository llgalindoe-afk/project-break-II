import prisma from "../src/lib/prisma.js"

const productData = {
  name: "iPhone 15 Pro",
  description: "El último teléfono inteligente de Apple con cuerpo de titanio, chip A17 Pro y un sistema de cámaras avanzado.",
  price: 999.99,
  imageUrl: "iphone_15_pro_1782383302927.png"
}

console.log("Insertando producto en la base de datos Supabase...")

try {
  const product = await prisma.product.create({
    data: productData
  })
  console.log("¡Producto creado con éxito!")
  console.log(JSON.stringify(product, null, 2))
} catch (error) {
  console.error("Error al crear el producto:", error)
} finally {
  await prisma.$disconnect()
}
