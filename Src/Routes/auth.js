const express = require("express");
const {
  addTransactions,
  getTransactions,
  deleteTransaction,
  loginAuthentication,
  registerUser,
} = require("../TransactionApis/TransactionApis");
const UserModel = require("../models/UserModel");
const { verifyToken } = require("../middleware/verifyData");
const router = express.Router();

router.post("/login", loginAuthentication);
router.post("/register", registerUser);

router
  .route("/manageTransactions")
  .post(verifyToken, addTransactions)
  .get(verifyToken, getTransactions);

router.delete("/manageTransactions/:id", verifyToken, deleteTransaction);

module.exports = router;
