const error = require("../error/error");
module.exports = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if (req.path === "/register") {
      if (![email, name, password].every(Boolean)) {
        return error.unauthorize(res, "missing Credentials");
      } else if (!validateEmail(email)) {
        return error.unauthorize(res, "Invalid Email");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return error.unauthorize(res, "Missing Credentials");
      } else if (!validateEmail(email)) {
        return error.unauthorize(res, "Invalid Email");
      }
    }
    next();
  } catch (err) {
    return error.internalServerError(res, err.message);
  }
};
