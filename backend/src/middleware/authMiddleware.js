import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message:
        "Ingreso no autorizado. No se ha encontrado token de autenticación.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({
      message:
        "Ingreso no autorizado. El token de autenticación no es el correcto.",
    });
  }
};
