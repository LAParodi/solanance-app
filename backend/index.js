//---- Módulos Node.js
import path from "path";
// import process from "process";
import { fileURLToPath } from "url";

//---- Dependencias de terceros
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

//----- Carga de variables de entorno
dotenv.config();

//----- Módulos locales de la aplicación
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import incomeRoutes from "./src/routes/incomeRoutes.js";
import expenseRoutes from "./src/routes/expenseRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

//----- Configuración para enrutamiento de archivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//----- Inicialización del servidor con Express
const app = express();

//----- Configuración de middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//----- Conexión a la base de datos de MongoDB
connectDB();

//---- Definición de rutas de autenticación
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

//---- Servir archivos estáticos desde la carpeta 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//----- Variable constante para determinar el Puerto
const PORT = process.env.PORT || 5000;

//---- Iniciar el servidor y manejar errores
app
  .listen(PORT, () => {
    console.log(`El servidor está ejecutándose en el puerto ${PORT}`);
  })
  .on("error", (error) => {
    console.error(`Error al iniciar el servidor: ${error.message}`);
    process.exit(1);
  });
