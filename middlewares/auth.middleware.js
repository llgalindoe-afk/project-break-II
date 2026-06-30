import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  let token = req.cookies.token

  // Permitir también autenticación por cabecera Bearer (para Swagger)
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({
      ok: false,
      error: "No autenticado",
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // {id, email, role}
    next()
  } catch (error) {
    // Si viene de cookie, la limpiamos, si no, solo retornamos error
    if (req.cookies.token) {
      res.clearCookie("token")
    }
    res.status(401).json({
      ok: false,
      error: "Sesión inválida o expirada",
    })
  }
}
