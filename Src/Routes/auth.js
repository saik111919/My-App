const express = require('express');
const { addTransactions, getTransactions, deleteTransaction } = require('../TransactionApis/TransactionApis');
const router = express.Router();

router.get('/', getTransactions)

// router.route('/manageTransactions').post(addTransactions).delete(deleteTransaction);
// Route to handle POST requests to create new transactions
router.post('/manageTransactions', addTransactions);

// Route to handle DELETE requests to delete transactions by ID
router.delete('/manageTransactions/:id', deleteTransaction);

module.exports = router;
