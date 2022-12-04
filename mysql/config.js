const mysql = require('mysql');

module.exports = {
  getCon: () => mysql.createConnection({
    host: "localhost",
    user: "JS_USER",
    password: "password",
    database: "restaurants"
  }),
  functions: mysql
};