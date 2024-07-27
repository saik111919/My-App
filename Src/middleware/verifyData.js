const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const token =
  //   req.headers.authorization || req.query.token || req.cookies.token;
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token not provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // if (decoded.role !== "admin") {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    req.user = decoded;

    // console.log(decoded);
    next();
  });
};

module.exports = { verifyToken };

// import jwt from "jsonwebtoken";
// import User from "../models/UserModel";

// const auth = async (req, res, next) => {
//   const token = req.headers.authorization?.replace("Bearer ", "");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const user = await User.findById(decoded._id);

//     if (!user) {
//       throw new Error("User not found");
//     }

//     req.user = user;
//     next();
//   } catch {
//     res.status(401).json({ error: "Please authenticate." });
//   }
// };

// export default auth;
