import { useState } from "react";

import Input from "../inputs/Input";
import EmojiPickerckerPopup from "../Income/EmojiPickerckerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    icon: "",
    date: "",
    amount: "",
    category: "",
  });

  //----- Manejador de eventos de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <div>
      <EmojiPickerckerPopup
        name={"icon"}
        icon={expense.icon}
        onSelect={(selectedIcon) =>
          handleChange({
            target: {
              name: "icon",
              value: selectedIcon,
            },
          })
        }
      />

      <Input
        type={"text"}
        id={"category"}
        name={"category"}
        label={"Categoría"}
        onChange={handleChange}
        value={expense.category}
        placeholder={"Comida, viajes, compras, etc"}
      />

      <Input
        id={"amount"}
        type={"number"}
        name={"amount"}
        value={expense.amount}
        label={"Dinero usado"}
        onChange={handleChange}
        placeholder={"S/ 1000.00"}
      />

      <Input
        id={"date"}
        type={"date"}
        name={"date"}
        value={expense.date}
        label={"Ingresa fecha"}
        onChange={handleChange}
      />

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => onAddExpense(expense)}
          className="add-btn"
        >
          Añadir consumo
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
