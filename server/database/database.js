const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

// 1. Opens the database file (its created automatically if its missing)
const db = new Database(
  path.join(__dirname, "..", "data", "bulldog-records.db"),
);

// 2. Turns on foreign keys
db.pragma("foreign_keys = ON");

// 3. Reads .sql file and runs
const tables = fs.readFileSync(path.join(__dirname, "tables1.sql"), "utf8");
db.exec(tables);

// 4. Shares the connection
module.exports = db;
