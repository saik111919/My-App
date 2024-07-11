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

// exports.getTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find({ user: req.user._id });
//     res.status(200).json(transactions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch transactions" });
//   }
// };

exports.getTransactions = async (req, res) => {
  console.log("Request:", req);

  try {
    // Check if user ID is available
    if (!req.user || !req.user._id) {
      return res
        .status(400)
        .json({ message: "User ID is missing from request" });
    }

    console.log("User ID:", req.user._id);

    const transactions = await Transaction.find({ user: req.user._id });
    console.log("Transactions fetched:", transactions);

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for user" });
    }

    // Group transactions by month and year
    const groupedTransactions = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.createdAt);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!acc[monthYear]) {
        acc[monthYear] = {
          transactions: [],
          totalCredited: 0,
          totalSpent: 0,
        };
      }

      acc[monthYear].transactions.push(transaction);

      if (transaction.type === "credited") {
        acc[monthYear].totalCredited += transaction.amount;
      } else if (transaction.type === "spent") {
        acc[monthYear].totalSpent += transaction.amount;
      }

      return acc;
    }, {});

    console.log("Grouped transactions:", groupedTransactions);

    // Convert grouped transactions object to an array of { monthYear, transactions, totalCredited, totalSpent, remainingAmount } objects
    const result = Object.keys(groupedTransactions).map((monthYear) => ({
      monthYear,
      transactions: groupedTransactions[monthYear].transactions,
      totalCredited: groupedTransactions[monthYear].totalCredited,
      totalSpent: groupedTransactions[monthYear].totalSpent,
      remainingAmount:
        groupedTransactions[monthYear].totalCredited -
        groupedTransactions[monthYear].totalSpent,
    }));

    console.log("Result:", result);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching transactions:", err);
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
