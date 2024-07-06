exports.addTransactions = (req, res) => {
    const { amount, title, type } = req.body;
    console.log('trigger');
    // Validate data (optional)
    if (!amount || !title || !type) {
        return res.status(400).send({ message: 'Missing required data (amount, title, type)' });
    }

    // Process the data here (e.g., store it in a database)
    console.log(`Received data: amount: ${amount}, title: ${title}, type: ${type}`);

    // Send a success response
    res.status(201).send({ message: 'Data received successfully' });
}

exports.getTransactions = (req, res) => {
    res.send('Hello World!')
    console.log("Hello");
}