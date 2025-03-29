import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";
import { uploadImage } from "../../utils/uploadImage";
import { UserContext } from "../../context/UserContext";
import { axiosInstance } from "../../utils/axiosInstance";

const SignUp = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
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

  //----- Manejador de foto de perfil
  const handleProfilePicChange = (newImage) => {
    setFormData((prevState) => ({
      ...prevState,
      profilePic: newImage,
    }));
  };

  //----- Manejador de registro
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    const { name, email, password, profilePic } = formData;
    if (!name || !validateEmail(email) || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener 8 o más carácteres.");
      return;
    }

    setError("");
    setFormData({ name: "", email: "", password: "", profilePic: null });

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/inicio");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Algo salió mal. Inténtalo de nuevo en unos momentos.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="register__container">
        <h3 className="title">Bievenido a Solnance</h3>
        <p className="paragraph">Toma el control de tus consumos</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector
            image={formData.profilePic}
            setImage={handleProfilePicChange}
          />

          <div className="register-grid-container">
            <Input
              id={"name"}
              type={"text"}
              name={"name"}
              value={formData.name}
              onChange={handleChange}
              label="Nombre completo"
              placeholder="Luigui P."
            />
            <Input
              id={"email"}
              type={"email"}
              name={"email"}
              value={formData.email}
              onChange={handleChange}
              label="Correo electrónico"
              placeholder="laparodi.dev@gmail.com"
            />

            <div className="col-span-2">
              <Input
                id={"password"}
                type={"password"}
                name={"password"}
                value={formData.password}
                onChange={handleChange}
                label="Contraseña segura"
                placeholder="Mínimo 8 carácteres"
              />
            </div>
          </div>

          {error && <span className="error">{error}</span>}

          <button type="submit" className="btn-primary">
            Crear cuenta
          </button>
          <p className="link-text">
            ¿Ya tienes cuenta?{" "}
            <Link to={"/ingresar"} className="link">
              Ingresa aquí.
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
