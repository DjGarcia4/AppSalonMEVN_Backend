import User from "../models/User.js";
import { SendEmailVerification } from "../emails/authEmailService.js";

const register = async (req, res) => {
  //Validate the request body
  if (Object.values(req.body).includes("")) {
    const error = new Error("Please fill all fields");
    return res.status(400).json({
      msg: error.message,
    });
  }
  const { name, email, password } = req.body;
  //Avoid  duplicate users
  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("Email already exists!");
    return res.status(400).json({
      msg: error.message,
    });
  }
  //Validate the longitude of the password
  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
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
      msg: "User created successfully check  your email for verification",
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyAccount = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) {
    const error = new Error(`User not found!`);
    return res.status(401).json({
      msg: error.message,
    });
  }
  try {
    user.verified = true;
    user.token = "";
    await user.save();
    res.json({
      msg: "User verified  successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    const error = new Error("Please fill all fields");
    return res.status(400).json({
      msg: error.message,
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(`User not exist!`);
    return res.status(401).json({
      msg: error.message,
    });
  }
  if (!user.verified) {
    const error = new Error(`User  is not verified! Please check your mail.`);
    return res.status(401).json({
      msg: error.message,
    });
  }
  if (await user.checkPassword(password)) {
    res.json({
      msg: "Logged in Successfully",
    });
  } else {
    const error = new Error(`Password  incorrect!`);
    return res.status(401).json({
      msg: error.message,
    });
  }
};
export { register, verifyAccount, login };
