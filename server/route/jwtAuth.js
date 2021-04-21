const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const error = require("../error/error");

router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);

    if (user.rowCount !== 0) {
      return error.unauthorize(res, "User already exist");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users(user_name, user_email,user_password) VALUES($1,$2,$3) RETURNING*;",
      [name, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);
    return res.json({ token });
  } catch (err) {
    console.error("error: ", err);
    return error.internalServerError("Server Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);
    if (user.rowCount == 0) {
      return error.unauthorize(res, "Password Or Email incorrect");
    }
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    console.log(validPassword);
    if (!validPassword) {
      return error.unauthorize(res, "Password Or Email incorrect");
    }
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    error.internalServerError(res, "Internal Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    error.internalServerError(res, "Internal Error");
  }
});
module.exports = router;
