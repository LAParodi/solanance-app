import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";

import CustomLineChart from "../charts/CustomLineChart";

import { prepareExpenseLineChartData } from "../../utils/helper";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  //----- Renderizado reactivo
  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="recentTransactions__card">
      <div className="flex justify-between items-center">
        <div className="">
          <h5 className="text-lg">Resumen de consumos</h5>
          <p className="text-sm text-content mt-0.5">
            Monitorea, analiza y toma decisiones de tus movimientos financieros
          </p>
        </div>

        <button onClick={onAddExpense} className="add-btn">
          <LuPlus className="text-lg" />
          Añadir consumo
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
