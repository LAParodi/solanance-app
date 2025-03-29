import xlsx from "xlsx";

import Expense from "../models/expense.js";

//---- API de creación de gastos
export const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;
    if (!category || !amount || !date) {
      return res.status(400).json({
        message: "Todos los campos son requeridos.",
      });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "El monto debe ser un número positivo.",
      });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json({
      message: "Se ha creado un registro de gasto.",
      newExpense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al añadir el registro.",
      error: error.message || "Error interno del servidor",
    });
  }
};

//---- API de obtención de todos los gastos
export const getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      message: "Se han obtenidos todos los registros.",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al obtener todos los registros.",
      error: error.message || "Error interno del servidor",
    });
  }
};

//---- API de eliminación de registro de gastos
export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await Expense.findByIdAndDelete(id);

    res.status(200).json({
      message: "Eliminaste el registro satisfactoriamente.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al eliminar el registro.",
      error: error.message || "Error interno del servidor",
    });
  }
};

//---- API de descarga de archivo excel de gastos
export const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    if (expense.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay gastos registrados para descargar." });
    }

    const data = expense.map((item) => ({
      Categoría: item.category,
      Cantidad: item.amount,
      Fecha: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Gastos");

    const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=detalles-de-gastos-actuales.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(excelBuffer);
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al descargar el registro.",
      error: error.message,
    });
  }
};
