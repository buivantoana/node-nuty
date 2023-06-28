import express from "express";
const app = express();
const bodyParser = require("body-parser");
import initwed from "./src/router/wed.js";
import connect from "./src/config/connextdb.js";
var cookieParser = require("cookie-parser");
require("dotenv").config();
import cors from "cors";
// app.use(
//   cors({
//     origin: true,
//   })
// );
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Route handler để get cookie
app.get("/user", (req, res) => {
  const accessToken = req.cookies;
  console.log(accessToken);
  res.status(200).json({ data: accessToken });
});
initwed(app);
connect();

let post = process.env.POST || 6969;
// post = undefined => post = 6969

app.listen(post, () => {
  console.log("back-end node-js is runing on the post: " + post);
});
