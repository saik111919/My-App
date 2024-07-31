import express from "express";
import {
  addTransactions,
  deleteTransaction,
  getTransactions,
  getUserProfile,
  loginAuthentication,
  registerUser,
  updateUserDetails,
} from "./TransactionApis/TransactionApis.js";
import { verifyToken } from "../middleware/verifyData.js";

const router = express.Router();

router.post("/login", loginAuthentication);
router.post("/register", registerUser);

router
  .route("/manageTransactions")
  .post(verifyToken, addTransactions)
  .get(verifyToken, getTransactions);

router.delete("/manageTransactions/:id", verifyToken, deleteTransaction);
// router.patch("/user-data", verifyToken, updateUserDetails);
router
  .route("/user-data")
  .patch(verifyToken, updateUserDetails)
  .get(verifyToken, getUserProfile);

export default router;
