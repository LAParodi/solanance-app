import { isValidObjectId, Types } from "mongoose";

import Income from "../models/income.js";
import Expense from "../models/expense.js";

//----- API de obtención de todos los registros
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const lastSixtyDaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLastSixtyDays = lastSixtyDaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const lastThirtyDaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLastThirtyDays = lastThirtyDaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "ingreso",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "gasto",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncomes: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      lastThirtyDaysExpenses: {
        total: expenseLastThirtyDays,
        transactions: lastThirtyDaysExpenseTransactions,
      },
      lastSixtyDaysIncomes: {
        total: incomeLastSixtyDays,
        transactions: lastSixtyDaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al obtener los registros.",
      error: error.message,
    });
  }
};
