const BASE_URL = "http://localhost:3000";

async function runTest() {
  console.log("=== INICIANDO PRUEBA DE FUNCIONALIDADES MONGODB (REVIEWS Y WISHLIST) ===");

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
  
  const tokenCookie = rawCookies.split(";")[0];
  console.log("Cookie de sesión extraída:", tokenCookie);

  const headersWithCookie = {
    "Content-Type": "application/json",
    "Cookie": tokenCookie,
  };

  // ==========================================
  // PRUEBAS DE REVIEWS (RESEÑAS)
  // ==========================================
  
  // 2. Agregar reseña a producto 1
  console.log("\n2. Agregando una reseña al producto ID: 1...");
  const addReviewRes = await fetch(`${BASE_URL}/api/products/1/reviews`, {
    method: "POST",
    headers: headersWithCookie,
    body: JSON.stringify({
      rating: 5,
      comment: "¡Excelente teléfono! La duración de la batería y la cámara de titanio son espectaculares.",
    }),
  });

  const addReviewData = await addReviewRes.json();
  console.log("Respuesta de agregar reseña:", addReviewData);

  if (!addReviewRes.ok) {
    throw new Error(`Error al añadir reseña: ${addReviewData.error}`);
  }

  // 3. Obtener reseñas del producto 1
  console.log("\n3. Obteniendo las reseñas del producto ID: 1...");
  const getReviewsRes = await fetch(`${BASE_URL}/api/products/1/reviews`, {
    method: "GET",
  });

  const getReviewsData = await getReviewsRes.json();
  console.log("Reseñas del producto:", JSON.stringify(getReviewsData, null, 2));

  if (!getReviewsRes.ok) {
    throw new Error(`Error al obtener reseñas: ${getReviewsData.error}`);
  }

  // ==========================================
  // PRUEBAS DE WISHLIST (FAVORITOS)
  // ==========================================

  // 4. Agregar producto 1 a la Wishlist (Toggle ON)
  console.log("\n4. Agregando producto ID 1 a favoritos (Wishlist)...");
  const addToWishlistRes = await fetch(`${BASE_URL}/api/wishlist/1`, {
    method: "POST",
    headers: headersWithCookie,
  });

  const addToWishlistData = await addToWishlistRes.json();
  console.log("Respuesta de Wishlist (Toggle ON):", addToWishlistData);

  if (!addToWishlistRes.ok) {
    throw new Error(`Error al agregar a wishlist: ${addToWishlistData.error}`);
  }

  // 5. Consultar Wishlist (Debe retornar el detalle completo del producto traído de Supabase)
  console.log("\n5. Consultando la Wishlist del usuario...");
  const getWishlistRes = await fetch(`${BASE_URL}/api/wishlist`, {
    method: "GET",
    headers: headersWithCookie,
  });

  const getWishlistData = await getWishlistRes.json();
  console.log("Contenido de Wishlist (detalle Supabase):", JSON.stringify(getWishlistData, null, 2));

  if (!getWishlistRes.ok) {
    throw new Error(`Error al obtener wishlist: ${getWishlistData.error}`);
  }

  if (getWishlistData.data.length === 0 || getWishlistData.data[0].id !== 1) {
    throw new Error("El producto ID 1 no está en la wishlist o no se recuperaron sus datos correctamente");
  }
  console.log("¡Verificación exitosa: Los detalles del producto se cargaron desde Supabase!");

  // 6. Remover producto 1 de la Wishlist (Toggle OFF)
  console.log("\n6. Quitándose el producto ID 1 de favoritos (Wishlist)...");
  const removeFromWishlistRes = await fetch(`${BASE_URL}/api/wishlist/1`, {
    method: "POST",
    headers: headersWithCookie,
  });

  const removeFromWishlistData = await removeFromWishlistRes.json();
  console.log("Respuesta de Wishlist (Toggle OFF):", removeFromWishlistData);

  if (!removeFromWishlistRes.ok) {
    throw new Error(`Error al remover de wishlist: ${removeFromWishlistData.error}`);
  }

  // 7. Consultar Wishlist vacía
  console.log("\n7. Consultando la Wishlist nuevamente (debería estar vacía)...");
  const getWishlistEmptyRes = await fetch(`${BASE_URL}/api/wishlist`, {
    method: "GET",
    headers: headersWithCookie,
  });

  const getWishlistEmptyData = await getWishlistEmptyRes.json();
  console.log("Contenido de Wishlist:", getWishlistEmptyData);

  if (getWishlistEmptyData.data.length !== 0) {
    throw new Error("La wishlist no está vacía tras el toggle OFF");
  }

  console.log("\n=== PRUEBA DE MONGODB COMPLETADA CON ÉXITO ===");
  process.exit(0);
}

runTest().catch((err) => {
  console.error("ERROR EN EL TEST DE MONGODB:", err);
  process.exit(1);
});
