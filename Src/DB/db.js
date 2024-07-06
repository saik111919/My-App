// const mongoose = require('mongoose');
// require('dotenv').config();


// async function getClientAndCollection() {
//   try {
//     await mongoose.connect(process.env.DB_CONNECT_DB, {
//       useNewUrlParser: true,
//       // useUnifiedTopology: true,
//       // Remove useCreateIndex option
//     });
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// module.exports = {
//   getClientAndCollection,
// };

const mongoose = require('mongoose');
require('dotenv').config();

async function getClientAndCollection() {
  try {
    await mongoose.connect(process.env.DB_CONNECT_DB); // No need for the deprecated options
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = {
  getClientAndCollection,
};
