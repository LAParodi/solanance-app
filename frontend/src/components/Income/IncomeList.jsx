import { LuDownload } from "react-icons/lu";

import TransactionInfoCard from "../cards/TransactionInfoCard";

import { formatDate } from "../../utils/helper";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="recentTransactions__card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Registro de ingresos</h5>
        <button onClick={onDownload} className="download-btn">
          <LuDownload className="h-4 w-4" />
          Descargar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            type={"ingreso"}
            key={income._id}
            icon={income.icon}
            title={income.source}
            amount={income.amount}
            date={formatDate(income.date)}
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
