import { LuArrowRight } from "react-icons/lu";

import TransactionInfoCard from "../cards/TransactionInfoCard";

import { formatDate } from "../../utils/helper";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="recentTransactions__card">
      <div className="card">
        <h5 className="card-title">Operaciones Recientes</h5>
        <button onClick={onSeeMore} className="card-btn">
          Ver todos <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 4)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            icon={item.icon}
            type={item.type}
            amount={item.amount}
            date={formatDate(item.date)}
            title={item.type === "gasto" ? item.category : item.source}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
