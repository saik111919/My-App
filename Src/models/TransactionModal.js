// const mongoose = require('mongoose');

// const TransactionSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         trim: true,
//         required: [true, 'Please add some text']
//     },
//     amount: {
//         type: Number,
//         required: [true, 'Please add a positive or negative number']
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     type: {
//         type: String,
//         required: [true, 'Please select the type of usage.']
//     }
// });

// module.exports = mongoose.model('Transaction', TransactionSchema);

// models/TransactionModal.js
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: [true, "Please select the type of usage."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
