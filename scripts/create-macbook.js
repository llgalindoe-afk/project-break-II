import prisma from "../src/lib/prisma.js"

const productData = {
  name: "MacBook Pro 16",
  description: "El portátil profesional más potente de Apple, con chip M3 Max, 36 GB de memoria unificada y una impresionante pantalla Liquid Retina XDR de 16 pulgadas.",
  price: 2499.99,
  imageUrl: "macbook_pro_1782466460734.png"
}

console.log("Insertando portátil Apple en la base de datos Supabase...")

try {
  const product = await prisma.product.create({
    data: productData
  })
  console.log("¡Portátil Apple creado con éxito!")
  console.log(JSON.stringify(product, null, 2))
} catch (error) {
  console.error("Error al crear el producto:", error)
} finally {
  await prisma.$disconnect()
}
