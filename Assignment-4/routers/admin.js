const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();
const users = [];

router.get("/", (req, res, next) => {
//   res.sendFile(path.join(rootDir, "views", "add-users.html"));
res.render('add-users',{pageTitle: "Add Users", path:'/', activeAddUsers: true})
});
router.post("/", (req, res, next) => {
  users.push({ username: req.body.username });
  res.redirect("/users");
});
exports.routes = router;
exports.users = users;
