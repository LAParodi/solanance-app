import { useEffect, useState } from "react";

import CustomBarChart from "../charts/CustomBarChart";

import { prepareExpenseBarChartData } from "../../utils/helper";

const Last30DaysExpense = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  //----- Renderizado reactivo
  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="recentTransactions__card">
      <div className="card">
        <h5 className="card-title">Últimos consumos (30 días)</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpense;
