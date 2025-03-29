import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";

import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import { axiosInstance } from "../../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { updateUser } = useContext(UserContext);

  //----- Manejador de eventos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //----- Manejador de inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!validateEmail(email) || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");
    setFormData({ email: "", password: "" });

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/inicio");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Algo salió mal. Inténtalo de nuevo en unos momentos.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="auth__container">
        <h3 className="title">Bievenido a Solnance</h3>
        <p className="paragraph">Ingresa tus credenciales</p>

        <form onSubmit={handleLogin}>
          <Input
            id={"email"}
            type={"email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            label="Correo electrónico"
            placeholder="laparodi.dev@gmail.com"
          />
          <Input
            id={"password"}
            type={"password"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
          />

          {error && <span className="error">{error}</span>}

          <button type="submit" className="btn-primary">
            Iniciar sesión
          </button>
          <p className="link-text">
            ¿No tienes cuenta?{" "}
            <Link to={"/registro"} className="link">
              Crea una aquí.
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
