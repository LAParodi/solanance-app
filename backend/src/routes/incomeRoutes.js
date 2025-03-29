import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../controllers/incomeController.js";

const router = express.Router();

//----- Rutas POST
router.post("/", protect, addIncome);

//----- Rutas GET
router.get("/", protect, getAllIncome);
router.get("/download", protect, downloadIncomeExcel);

//----- Rutas DELETE
router.delete("/:id", protect, deleteIncome);

export default router;
