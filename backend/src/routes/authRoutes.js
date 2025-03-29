import express from "express";

import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { login, register, getUserInfo } from "../controllers/authController.js";

const router = express.Router();

//----- Rutas POST
router.post("/login", login);
router.post("/register", register);

//----- Rutas GET
router.get("/getUserInfo", protect, getUserInfo);

//----- API para subir imagen
router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No has subido ninguna imagen.",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    res.status(200).json({
      message: "Imagen subida correctamente.",
      fileName: req.file.filename,
      imageUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al subir la imagen.",
      error: error.message,
    });
  }
});

export default router;
