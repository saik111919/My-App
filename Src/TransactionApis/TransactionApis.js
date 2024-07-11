const Transaction = require("../models/TransactionModal");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.addTransactions = async (req, res) => {
  const { amount, title, type } = req.body;

  if (!amount || !title || !type) {
    return res
      .status(400)
      .send({ message: "Missing required data (amount, title, type)" });
  }

  try {
    const newTransaction = new Transaction({
      title,
      amount,
      type,
      user: req.user._id,
    });

    const savedTransaction = await newTransaction.save();

    res.status(201).send({ message: "Data received successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to save transaction" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};

exports.loginAuthentication = async (req, res) => {
  const { mobile } = req.body;

  try {
    let user = await UserModel.findOne({ mobile });

    if (!user) {
      user = new UserModel({ mobile });
      await user.save();
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to login" });
  }
};
