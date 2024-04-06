import User from "../models/User.js";
import {
  SendEmailVerification,
  sendEmailPasswordRest,
} from "../emails/authEmailService.js";
import { generateJWT, uniqueId } from "../utils/index.js";

const register = async (req, res) => {
  //Validate the request body
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({
      msg: error.message,
    });
  }
  const { name, email, password } = req.body;
  //Avoid  duplicate users
  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("Esta cuenta ya existe!");
    return res.status(400).json({
      msg: error.message,
    });
  }
  //Validate the longitude of the password
  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `La contraseña debe de contener al menors ${MIN_PASSWORD_LENGTH} caracteres.`
    );
    return res.status(400).json({
      msg: error.message,
    });
  }
  try {
    const user = new User(req.body);
    const result = await user.save();
    const { name, email, token } = result;
    SendEmailVerification({ name, email, token });
    res.json({
      msg: "Usuario registrado correctamente, revisa tu email  para activar la cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyAccount = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) {
    const error = new Error(`Usuario no encontrado!`);
    return res.status(401).json({
      msg: error.message,
    });
  }
  try {
    user.verified = true;
    user.token = "";
    await user.save();
    res.json({
      msg: "Usuario verificado correctamente!",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios.");
    return res.status(400).json({
      msg: error.message,
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(`El usuario no existe!`);
    return res.status(401).json({
      msg: error.message,
    });
  }
  if (!user.verified) {
    const error = new Error(`El usuario no esta verificado, revisa tu email.`);
    return res.status(401).json({
      msg: error.message,
    });
  }
  if (await user.checkPassword(password)) {
    const token = generateJWT(user._id);
    res.json({
      token,
    });
  } else {
    const error = new Error(`Contraseña incorrecta!`);
    return res.status(401).json({
      msg: error.message,
    });
  }
};

const user = async (req, res) => {
  const { user } = req;
  res.json(user);
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(`El usuario no existe!`);
    return res.status(404).json({
      msg: error.message,
    });
  }
  try {
    user.token = uniqueId();
    const result = await user.save();
    await sendEmailPasswordRest({
      name: result.name,
      email: result.email,
      token: result.token,
    });
    res.json({
      msg: "Hemos enviado un email con las instrucciones!",
    });
  } catch (error) {
    console.log(error);
  }
};
const verifyPasswordResetToken = async (req, res) => {
  const { token } = req.params;
  const isValidToken = await User.findOne({ token });
  if (!isValidToken) {
    const error = new Error(`El token no es valido!`);
    return res.status(404).json({
      msg: error.message,
    });
  }
  res.json({ msg: "Token Valido" });
};
const updatePassword = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) {
    const error = new Error(`El token no es valido!`);
    return res.status(404).json({
      msg: error.message,
    });
  }
  const { password } = req.body;
  try {
    user.token = "";
    user.password = password;
    await user.save();
    res.json({ msg: `Contraseña actualizada correctamente.` });
  } catch (error) {
    console.log(error);
  }
};
export {
  register,
  verifyAccount,
  login,
  user,
  forgotPassword,
  verifyPasswordResetToken,
  updatePassword,
};
