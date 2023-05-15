const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const adminData = require("./admin");
const router = express.Router();

router.get("/users", (req, res, next) => {
  //   res.sendFile(path.join(rootDir, "views", "users.html"));
  const users = adminData.users
  console.log("users",users)
  res.render("users", { pageTitle: "Users", path: "/users", usersData : users, hasUsers: users.length > 0, activeUsers: true});
});

module.exports = router;
