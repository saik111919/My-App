const Transaction = require("../models/TransactionModal");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Utility function to handle responses and errors
const sendResponse = (res, status, message, data = {}) => {
  res.status(status).send({ message, ...data });
};

const validateRequestBody = (body, fields) => {
  return fields.every((field) => body[field] != null);
};

exports.addTransactions = async (req, res) => {
  const { amount, title, type } = req.body;

  if (!validateRequestBody(req.body, ["amount", "title", "type"])) {
    return sendResponse(
      res,
      400,
      "Missing required data (amount, title, type)."
    );
  }

  try {
    const newTransaction = new Transaction({
      title,
      amount,
      type,
      user: req.user._id,
    });
    await newTransaction.save();
    sendResponse(res, 201, "Data received successfully.");
  } catch (err) {
    sendResponse(res, 500, "Failed to save transaction.");
  }
};

exports.getTransactions = async (req, res) => {
  if (!req.user?._id) {
    return sendResponse(res, 400, "User ID is missing from request.");
  }

  try {
    const transactions = await Transaction.find({ user: req.user._id });
    if (transactions.length === 0) {
      return sendResponse(res, 404, "No transactions found for user.");
    }

    const grouped = transactions.reduce(
      (acc, { _id, createdAt, type, amount, title }) => {
        const date = new Date(createdAt);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

        if (!acc[monthYear]) {
          acc[monthYear] = {
            transactions: [],
            totalCredited: 0,
            totalSpent: 0,
          };
        }

        acc[monthYear].transactions.push({
          _id,
          createdAt,
          type,
          amount,
          title,
        });
        acc[monthYear][
          `total${type.charAt(0).toUpperCase() + type.slice(1)}`
        ] += amount;

        return acc;
      },
      {}
    );

    const result = Object.entries(grouped).map(([monthYear, data]) => ({
      monthYear,
      ...data,
      remainingAmount: data.totalCredited - data.totalSpent,
    }));

    res.status(200).json(result);
  } catch (err) {
    sendResponse(res, 500, "Failed to fetch transactions.");
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
      return sendResponse(res, 404, "Transaction not found.");
    }

    await transaction.deleteOne();
    sendResponse(res, 200, "Transaction deleted successfully.");
  } catch (err) {
    sendResponse(res, 500, "Failed to delete transaction.");
  }
};

exports.registerUser = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    if (await UserModel.findOne({ mobile })) {
      return sendResponse(res, 400, "User already exists.");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );
    const newUser = new UserModel({ mobile, password: hashedPassword });
    await newUser.save();

    sendResponse(res, 200, "User registered successfully.");
  } catch (err) {
    sendResponse(res, 500, "Failed to register user.");
  }
};

exports.loginAuthentication = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await UserModel.findOne({ mobile });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendResponse(res, 400, "Invalid credentials.");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    sendResponse(res, 200, "User logged in successfully.", { token });
  } catch (err) {
    sendResponse(res, 500, "Failed to login.");
  }
};

exports.updateUserDetails = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return sendResponse(res, 404, "User not found.");
    }

    if (name) {
      user.name = name;
    }

    await user.save();
    sendResponse(res, 200, "User details updated successfully.", { user });
  } catch (err) {
    sendResponse(res, 500, "Failed to update user details.");
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("name");
    if (!user) {
      return sendResponse(res, 404, "User not found.");
    }
    sendResponse(res, 200, "User profile retrieved successfully.", {
      name: user.name,
    });
  } catch (err) {
    sendResponse(res, 500, "Failed to retrieve user profile.");
  }
};
