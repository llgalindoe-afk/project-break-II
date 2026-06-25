// Usamos el fetch global incorporado en Node.js

const BASE_URL = "http://localhost:3000";

async function runTest() {
  console.log("=== INICIANDO PRUEBA DEL FLUJO DE CARRITO ===");

  // 1. Iniciar sesión para obtener la cookie de autenticación
  console.log("\n1. Iniciando sesión como ana@example.com...");
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "ana@example.com",
      password: "password123",
    }),
  });

  const loginData = await loginRes.json();
  console.log("Respuesta de Login:", loginData);

  if (!loginRes.ok) {
    throw new Error(`Error en login: ${loginData.error}`);
  }

  // Extraer cookie
  const rawCookies = loginRes.headers.get("set-cookie");
  if (!rawCookies) {
    throw new Error("No se recibió cookie de sesión (set-cookie) en la respuesta");
  }
  
  // Extraer el token de la cookie
  const tokenCookie = rawCookies.split(";")[0];
  console.log("Cookie de sesión extraída:", tokenCookie);

  const headersWithCookie = {
    "Content-Type": "application/json",
    "Cookie": tokenCookie,
  };

  // 2. Añadir producto al carrito
  // Producto ID 1 (iPhone 15 Pro) creado en la tarea anterior
  console.log("\n2. Añadiendo producto (ID: 1, Cantidad: 2) al carrito...");
  const addItemRes = await fetch(`${BASE_URL}/api/cart/items`, {
    method: "POST",
    headers: headersWithCookie,
    body: JSON.stringify({
      productId: 1,
      quantity: 2,
    }),
  });

  const addItemData = await addItemRes.json();
  console.log("Respuesta de añadir al carrito:", addItemData);

  if (!addItemRes.ok) {
    throw new Error(`Error al añadir producto: ${addItemData.error}`);
  }

  // 3. Consultar el carrito
  console.log("\n3. Consultando el carrito activo...");
  const getCartRes = await fetch(`${BASE_URL}/api/cart`, {
    method: "GET",
    headers: headersWithCookie,
  });

  const getCartData = await getCartRes.json();
  console.log("Carrito activo:", JSON.stringify(getCartData, null, 2));

  if (!getCartRes.ok) {
    throw new Error(`Error al obtener carrito: ${getCartData.error}`);
  }

  // 4. Realizar checkout
  console.log("\n4. Realizando checkout del carrito...");
  const checkoutRes = await fetch(`${BASE_URL}/api/cart/checkout`, {
    method: "POST",
    headers: headersWithCookie,
  });

  const checkoutData = await checkoutRes.json();
  console.log("Respuesta de Checkout (Pedido Creado):", JSON.stringify(checkoutData, null, 2));

  if (!checkoutRes.ok) {
    throw new Error(`Error en checkout: ${checkoutData.error}`);
  }

  // 5. Consultar el carrito nuevamente para ver si cambió de estado o se creó uno nuevo activo
  console.log("\n5. Consultando el carrito después de checkout...");
  const getCartAfterRes = await fetch(`${BASE_URL}/api/cart`, {
    method: "GET",
    headers: headersWithCookie,
  });

  const getCartAfterData = await getCartAfterRes.json();
  console.log("Nuevo carrito (debería estar vacío/activo):", JSON.stringify(getCartAfterData, null, 2));

  // 6. Consultar el estado del carrito viejo directamente en la base de datos a través de Prisma
  // (Para verificar que efectivamente pasó a CHECKED_OUT en la base de datos)
  console.log("\n6. Verificando el estado en la base de datos...");
  // Importaremos dinámicamente prisma para verificarlo
  const { default: prisma } = await import("../src/lib/prisma.js");
  const cartsInDb = await prisma.cart.findMany({
    where: { userId: getCartData.data.userId },
    orderBy: { id: "desc" },
  });
  console.log("Historial de carritos de este usuario en base de datos:", cartsInDb);

  console.log("\n=== PRUEBA COMPLETADA CON ÉXITO ===");
  process.exit(0);
}

runTest().catch((err) => {
  console.error("ERROR EN EL TEST:", err);
  process.exit(1);
});
