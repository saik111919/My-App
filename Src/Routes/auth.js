const express = require("express");
const {
  addTransactions,
  getTransactions,
  deleteTransaction,
  loginAuthentication,
  getModifiedTransactions,
} = require("../TransactionApis/TransactionApis");
const UserModel = require("../models/UserModel");
const { verifyToken } = require("../middleware/verifyData");
const router = express.Router();

router.post("/login", loginAuthentication);

router
  .route("/manageTransactions")
  .post(verifyToken, addTransactions)
  .get(verifyToken, getTransactions);

router.route("/modifiedTransactions").get(verifyToken, getModifiedTransactions);
// Route to handle DELETE requests to delete transactions by ID
router.delete("/manageTransactions/:id", verifyToken, deleteTransaction);

module.exports = router;

// router.get("/", verifyToken, getTransactions);

// router.route('/manageTransactions').post(addTransactions).delete(deleteTransaction);
// Route to handle POST requests to create new transactions
// router.post("/manageTransactions", verifyToken, addTransactions);
