import { LuArrowRight } from "react-icons/lu";

import TransactionInfoCard from "../cards/TransactionInfoCard";

import { formatDate } from "../../utils/helper";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="recentTransactions__card">
      <div className="card">
        <h5 className="card-title">Ingresos Recientes</h5>
        <button onClick={onSeeMore} className="card-btn">
          Ver todos <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            icon={item.icon}
            type={"ingreso"}
            title={item.source}
            amount={item.amount}
            date={formatDate(item.date)}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
