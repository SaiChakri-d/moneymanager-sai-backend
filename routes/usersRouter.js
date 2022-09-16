import express from "express";
import {
  registerUsers,
  loginUser,
  getProfileUser,
  updateBudget,
  forgotPassword,
  checkToken,
  newPassword,
  confirmAccount,
  reqToConfirmAccount,
  editProfile,
} from "../controllers/usersControllers.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register-users", registerUsers);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.route("/forgot-password/:token").get(checkToken).post(newPassword);

// Private Routes
router.get("/profile", checkAuth, getProfileUser);

router.put("/edit-profile/:id", checkAuth, editProfile);

router.put("/update-budget/:id", checkAuth, updateBudget);

// Request to confirm account
router.post("/confirm-account/:id", checkAuth, reqToConfirmAccount);
router.get("/confirm-account/:token", confirmAccount);

export default router;
