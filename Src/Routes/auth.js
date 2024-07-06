const express = require('express');
const { addTransactions, getTransactions } = require('../TransactionApis/TransactionApis');
const router = express.Router();

router.get('/', getTransactions)

router.post('/addTransactions', addTransactions);

module.exports = router;
