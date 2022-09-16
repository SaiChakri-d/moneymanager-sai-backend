import jwt from "jsonwebtoken";
import Users from "../models/usersModel.js";
import errors from "../helpers/errors.js";

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // verify if authorization have Bearer Token
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usersBudget = await Users.findById(decoded.id).select(" -password ");

      return next();
    } catch (error) {
      return errors(res, 403, "Token invalidate");
    }
  }

  if (!token) {
    return errors(res, 403, "Token invalidate");
  }

  next();
};

export default checkAuth;
