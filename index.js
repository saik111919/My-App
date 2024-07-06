const express = require('express')
const app = express()
const port = 4000


const transactions = require('./routes/transactions');

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/ransactions', transactions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})