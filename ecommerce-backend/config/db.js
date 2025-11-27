const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Root",
  database: "ecommerce_app"
});

module.exports = db;
