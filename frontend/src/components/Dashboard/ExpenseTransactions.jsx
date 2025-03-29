import { LuArrowRight } from "react-icons/lu";

import TransactionInfoCard from "../cards/TransactionInfoCard";

import { formatDate } from "../../utils/helper";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="recentTransactions__card">
      <div className="flex justify-between items-center">
        <h5 className="text-lg">Consumos</h5>

        <button onClick={onSeeMore} className="card-btn">
          Ver todos <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 4)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            icon={expense.icon}
            type={expense.type}
            amount={expense.amount}
            title={expense.category}
            date={formatDate(expense.date)}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};
export default ExpenseTransactions;
