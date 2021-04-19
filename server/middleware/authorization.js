const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(401).json("Not Authorize");
    }
    const payload = jwt.verify(jwtToken, pro.env.jwtSecret);
    req.user = payload.user;
  } catch (err) {
    console.log(err.message);
    return res.status(401).json("Not Authorize");
  }
};
