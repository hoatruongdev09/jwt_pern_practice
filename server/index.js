const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/auth", require("./route/jwtAuth"));
app.use("/dashboard", require("./route/dashboard"));
app.listen(port, () => {
  console.log("app listening on port: ", port);
});
