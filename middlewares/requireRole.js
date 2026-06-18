export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({
        ok: false,
        error: `Acceso denegado. Se requiere rol ${role}`,
      })
    }

    next()
  }
}
