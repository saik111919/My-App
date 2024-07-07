// const Transaction = require("../models/TransactionModal");
// const jwt = require("jsonwebtoken");
// const User = require("../models/UserModel");

// exports.addTransactions = async (req, res) => {
//   const { amount, title, type } = req.body;

//   // Validate data (optional)
//   if (!amount || !title || !type) {
//     return res
//       .status(400)
//       .send({ message: "Missing required data (amount, title, type)" });
//   }

//   try {
//     const newTransaction = new Transaction({
//       title: title,
//       amount: amount,
//       type: type,
//       // createdAt: new Date()
//     });

//     const savedTransaction = await newTransaction.save();

//     console.log(
//       `Received data: amount: ${amount}, title: ${title}, type: ${type}`,
//       "DB",
//       savedTransaction
//     );

//     // Send a success response
//     res.status(201).send({ message: "Data received successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Failed to save transaction" });
//   }
// };

// exports.getTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find();
//     res.status(200).json(transactions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch transactions" });
//   }
// };

// exports.deleteTransaction = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const transaction = await Transaction.findById(id);

//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     console.log(transaction);
//     const data = {
//       title: transaction.title,
//       amount: transaction.amount,
//       type: transaction.type,
//     };
//     await transaction.deleteOne();
//     res
//       .status(200)
//       .json({ data: data, message: "Transaction deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete transaction" });
//   }
// };

// exports.authentication = async (req, res, next) => {
//   const token = req.header("Authorization").replace("Bearer ", "");

//   try {
//     const decoded = jwt.verify(token, "your_jwt_secret");
//     const user = await User.findOne({ _id: decoded._id });

//     if (!user) {
//       throw new Error();
//     }

//     req.user = user;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: "Please authenticate." });
//   }
// };

// TransactionApis/TransactionApis.js
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
