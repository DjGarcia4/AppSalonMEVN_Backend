import User from "../models/User.js";

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
    await user.save();
    res.json({
      msg: "User created successfully check  your email for verification",
    });
  } catch (error) {
    console.log(error);
  }
};
export { register };
