import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";

import CustomBarChart from "../charts/CustomBarChart";

import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  //----- Renderizado reactivo
  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="recentTransactions__card">
      <div className="flex justify-between items-center">
        <div className="">
          <h5 className="text-lg">Resumen de ingresos</h5>
          <p className="text-sm text-content mt-0.5">
            Monitorea, analiza y toma decisiones de tus movimientos financieros
          </p>
        </div>

        <button onClick={onAddIncome} className="add-btn">
          <LuPlus className="text-lg" />
          Añadir ingreso
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
