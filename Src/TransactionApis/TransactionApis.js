const Transaction = require('../models/TransactionModal');

exports.addTransactions = async (req, res) => {
    const { amount, title, type } = req.body;

    // Validate data (optional)
    if (!amount || !title || !type) {
        return res.status(400).send({ message: 'Missing required data (amount, title, type)' });
    }

    try {
        const newTransaction = new Transaction({
            title: title,
            amount: amount,
            type: type,
            createdAt: new Date()
        });

        const savedTransaction = await newTransaction.save();

        console.log(`Received data: amount: ${amount}, title: ${title}, type: ${type}`, 'DB', savedTransaction);

        // Send a success response
        res.status(201).send({ message: 'Data received successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Failed to save transaction' });
    }
};


exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        console.log(transaction);
        const data = {
            title: transaction.title,
            amount: transaction.amount,
            type: transaction.type,
        }
        await transaction.deleteOne();
        res.status(200).json({ data: data, message: 'Transaction deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete transaction' });
    }
};