import CustomPieChart from "../charts/CustomPieChart";

const EARTHY_COLORS = ["#c5b8ad", "#9f958a", "#918574", "524639", "171614"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Balance Total", amount: totalBalance },
    { name: "Ingreso Total", amount: totalIncome },
    { name: "Consumo Total", amount: totalExpense },
  ];
  
  return (
    <div className="recentTransactions__card">
      <div className="flex justify-between items-center">
        <h5 className="text-lg">Resumen Financiero</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Balance Total"
        totalAmount={`S/${totalBalance}`}
        colors={EARTHY_COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
