import {
  LuTrash2,
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  type,
  amount,
  date,
  onDelete,
  hideDeleteBtn,
}) => {
  const getAmountStyles = () => {
    return type === "ingreso"
      ? "bg-green-100 text-content"
      : "bg-rose-100 text-content";
  };
  return (
    <div className="group transaction">
      <div className="transaction-icon">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="transaction-details">
        <div className="flex flex-col justify-center">
          <p className="w-24 text-sm text-content font-medium truncate">
            {title}
          </p>
          <p className="mt-1 text-xs text-content">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="text-content hover:text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <LuTrash2 size={18} />
            </button>
          )}
        </div>

        <div
          className={`px-3 py-1.5 flex items-center gap-2 rounded-md ${getAmountStyles()}`}
        >
          <h6 className="text-xs font-medium">
            {type === "ingreso" ? "+" : "-"} S/{amount}
          </h6>
          {type === "ingreso" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
