import { LuDownload } from "react-icons/lu";

import TransactionInfoCard from "../cards/TransactionInfoCard";

import { formatDate } from "../../utils/helper";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="recentTransactions__card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Registro de consumos</h5>
        <button onClick={onDownload} className="download-btn">
          <LuDownload className="h-4 w-4" />
          Descargar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            type={"consumo"}
            key={expense._id}
            icon={expense.icon}
            title={expense.category}
            amount={expense.amount}
            date={formatDate(expense.date)}
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
