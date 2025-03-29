import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} from "../controllers/expenseController.js";

const router = express.Router();

//----- Rutas POST
router.post("/", protect, addExpense);

//----- Rutas GET
router.get("/", protect, getAllExpense);
router.get("/download", protect, downloadExpenseExcel);

//----- Rutas DELETE
router.delete("/:id", protect, deleteExpense);

export default router;
