import Users from "../models/usersModel.js";
import errors from "../helpers/errors.js";
import createJWT from "../helpers/createJWT.js";
import createToken from "../helpers/createToken.js";
import emailForgotPass from "../helpers/emailForgotPass.js";
import emailCheckAccount from "../helpers/emailCheckAccount.js";

const registerUsers = async (req, res) => {
  const { email } = req.body;

  const users = await Users.findOne({ email });

  if (users) {
    return errors(res, 400, "the email already exists");
  }

  try {
    const users = new Users(req.body);

    const userSave = await users.save();

    return res.status(200).json({ msg: "user" });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (!user) {
    return errors(res, 400, "the email dont exist");
  }

  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createJWT(user._id),
    });
  } else {
    return errors(res, 403, "the password or email is incorrect");
  }
};

const getProfileUser = (req, res) => {
  const { usersBudget } = req;

  res.json(usersBudget);
};

const reqToConfirmAccount = async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return errors(res, 400, "error");
  }

  try {
    emailCheckAccount({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      msg: "verify your email, we have sent you an email to verify your account",
    });
  } catch (error) {
    console.log(error);
  }
};

const confirmAccount = async (req, res) => {
  const { token } = req.params;

  const checkUser = await Users.findOne({ token });

  if (!checkUser) {
    return errors(res, 400, "invalid Token");
  }

  try {
    checkUser.confirmed = true;
    checkUser.token = null;

    await checkUser.save();

    res.json({ msg: "User Confirmed Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const editProfile = async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  const user = await Users.findById(id);

  if (!user) {
    return errors(res, 400, "error");
  }

  if (user.email !== req.body.email) {
    const existsEmail = await Users.findOne({ email });

    if (existsEmail) {
      return errors(res, 400, "That email is already in use");
    }
  }

  try {
    user.name = name;
    user.email = email;

    const updateUser = await user.save();

    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
};

const updateBudget = async (req, res) => {
  const { budget } = req.body;

  const user = await Users.findById(req.params.id);

  if (!user) {
    return errors(res, 400, "error");
  }

  const budgetString = budget.toString();

  try {
    user.budget = budgetString;
    const updateBudgetUser = await user.save();

    res.json(updateBudgetUser);
  } catch (error) {
    console.log(error);
  }
};

// recover password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const userExists = await Users.findOne({ email: email });

  if (!userExists) {
    return errors(res, 403, "The email has not been registered");
  }

  try {
    userExists.token = createToken();

    await userExists.save();

    emailForgotPass({
      email,
      name: userExists.name,
      token: userExists.token,
    });

    res.json({ msg: "We have sent an email with the instructions" });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;

  const check_token = await Users.findOne({ token });

  if (!check_token) {
    return errors(res, 400, "invalid Token");
  } else {
    res.json({ msg: "Valid token user exists" });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const userExists = await Users.findOne({ token });

  if (!userExists) {
    return errors(res, 400, "There was a mistake");
  }

  try {
    userExists.token = null;
    userExists.password = password;
    await userExists.save();

    res.json({ msg: "Your password has been reset successfully" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registerUsers,
  loginUser,
  getProfileUser,
  editProfile,
  reqToConfirmAccount,
  confirmAccount,
  updateBudget,
  forgotPassword,
  checkToken,
  newPassword,
};
