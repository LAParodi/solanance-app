import { useState } from "react";

import Input from "../inputs/Input";
import EmojiPickerckerPopup from "./EmojiPickerckerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    icon: "",
    date: "",
    source: "",
    amount: "",
  });

  //----- Manejador de eventos de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <EmojiPickerckerPopup
        name={"icon"}
        icon={income.icon}
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
        id={"source"}
        type={"text"}
        name={"source"}
        value={income.source}
        label={"Procedencia"}
        onChange={handleChange}
        placeholder={"Freelance, salario, etc"}
      />

      <Input
        id={"amount"}
        type={"number"}
        name={"amount"}
        value={income.amount}
        label={"Remuneración"}
        onChange={handleChange}
        placeholder={"S/ 1000.00"}
      />

      <Input
        id={"date"}
        type={"date"}
        name={"date"}
        value={income.date}
        label={"Ingresa fecha"}
        onChange={handleChange}
      />

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => onAddIncome(income)}
          className="add-btn"
        >
          Añadir ingreso
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
