import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

//---- API de ingreso del usuario
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Todos los campos son requeridos.",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({
        message: "Credenciales inválidas. Inténtalo de nuevo.",
      });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al iniciar sesión.",
      error: "Error interno del servidor",
    });
  }
};

//---- API de registro del usuario
export const register = async (req, res) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { name, email, password, profileImageUrl } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Todos los campos son requeridos.",
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "El formato del correo electrónico no es válido.",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      message: "La contraseña debe tener 8 o más carácteres.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "El correo electrónico ya ha sido registrado.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al registrarse.",
      error: "Error interno del servidor",
    });
  }
};

//---- API de recopilar información del usuario
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "No existe el usuario.",
      });
    }

    res.status(200).json({
      message: "Datos obtenidos satisfactoriamente.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un error al obtener los datos del usuario.",
      error: "Error interno del servidor",
    });
  }
};
