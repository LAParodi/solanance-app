import multer from "multer";

//----- Configurar el almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//----- Establecer filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se aceptan formatos .jpeg, .jpg y .png."), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
