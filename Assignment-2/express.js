const express = require("express");

const app = express();
app.use("/users", (req, res, next) => {
    res.send("<h1>This is Assignment 2 - /users</h1>");
});

app.use("/", (req, res, next) => {
  console.log("Tesing 1");
  console.log("Tesing 2");
  res.send("<h1>This is Assignment 2 - /</h1>");
});

app.listen(2000);
