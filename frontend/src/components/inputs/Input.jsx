import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ id, type, name, value, onChange, label, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  //----- Manejador de Entradas
  const getInputType = () => {
    if (type === "password") return showPassword ? "text" : "password";

    return type;
  };

  //----- Manejador de contraseñas
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="input-label">
        {label}
      </label>

      <div className="input-box">
        <input
          id={id}
          type={getInputType()}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={"true"}
          placeholder={placeholder}
          className="input"
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                aria-label="Ocultar contraseña"
                onClick={toggleShowPassword}
                className="text-primary cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                aria-label="Mostrar contraseña"
                onClick={toggleShowPassword}
                className="text-content cursor-pointer"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
