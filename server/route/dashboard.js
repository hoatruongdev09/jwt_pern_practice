const router = require("express").Router();
const { restart } = require("nodemon");
const pool = require("../db");
const error = require("../error/error");

const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    // res.json(req.user);
    const user = await pool.query("SELECT * FROM users WHERE user_id=$1", [
      req.user,
    ]);
    const { user_name, user_email } = user.rows[0];
    res.json({
      user_name: user_name,
      user_email: user_email,
    });
  } catch (err) {
    console.log(err.message);
    error.internalServerError(res, "Internal error");
  }
});

module.exports = router;
