import { useEffect, useState } from "react";
import CustomPieChart from "../charts/CustomPieChart";

const EARTHY_COLORS = ["#c5b8ad", "#9f958a", "#918574", "524639", "171614"];

const RecentIncomeWithChart = ({ data, totalIncomes }) => {
  const [chartData, setChartData] = useState([]);

  //----- Configuración de información por transacción
  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  //----- Renderizado reactivo
  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div className="recentTransactions__card">
      <div className="flex justify-between items-center">
        <h5 className="text-lg">Últimos ingresos (60 días)</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Ingreso total"
        totalAmount={`S/${totalIncomes}`}
        colors={EARTHY_COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default RecentIncomeWithChart;
