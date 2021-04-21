const jwt = require("jsonwebtoken");
const error = require("../error/error");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return error.unauthorize(res, "Not Authorize");
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } catch (err) {
    console.log("authorize: ", err.message);
    return error.unauthorize(res, "Not Authorize");
  }
};
