// To connect the node app with MySQL database using mysql2 npm package
// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'perficient@123'
// })

// module.exports = pool.promise()

// To connect the node app with MySQL database using sequelize npm package
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "perficient@123", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

// To connect the node app with mongodb database
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient