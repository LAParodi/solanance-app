import xlsx from "xlsx";

import Income from "../models/income.js";

//---- API de creación de ingresos
export const addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;
    if (!source || !amount || !date) {
      return res.status(400).json({
        message: "Todos los campos son requeridos.",
      });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "El monto debe ser un número positivo.",
      });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json({
      message: "Se ha creado un registro de ingreso.",
      newIncome,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al añadir el registro.",
      error: error.message || "Error interno del servidor",
    });
  }
};

//---- API de obtención de todos los ingresos
export const getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json({
      message: "Se han obtenidos todos los registros.",
      income,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al obtener todos los registros.",
      error: error.message || "Error interno del servidor",
    });
  }
};

//---- API de eliminación de registro de ingresos
export const deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    await Income.findByIdAndDelete(id);

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

//---- API de descarga de archivo excel de ingresos
export const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    if (income.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay ingresos registrados para descargar." });
    }

    const data = income.map((item) => ({
      Fuente: item.source,
      Cantidad: item.amount,
      Fecha: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Ingresos");

    const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=detalles-de-ingresos-actuales.xlsx"
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
