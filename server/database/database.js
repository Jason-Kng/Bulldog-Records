import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';

//Opens the database file (its created automatically if its missing)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = new Database(
  path.join(__dirname, "..", "data", "bulldog-records.db"),
);

//Turns on foreign keys
db.pragma("foreign_keys = ON");

//Reads .sql file and runs
const tables = fs.readFileSync(path.join(__dirname, "tables1.sql"), "utf8");
db.exec(tables);

//Shares the connection
export default db;
