// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
