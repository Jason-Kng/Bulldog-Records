import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../database/database.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/login', async (req, res) => {
  // Authenticate
  const { email, password } = req.body;

  // Need to check if they are in the correct format
  if (!email || !password) {
    return res.sendStatus(401).json({ message: 'Invalid email or password' });
  }

  const user = db.prepare(`
  SELECT User.userID, User.name, User.email, User.userType, Login.passwordHash 
  FROM User 
  JOIN Login ON User.userID = Login.userID 
  WHERE User.email = ?
  `).get(email);

  if (!user) {
    return res.sendStatus(401).json({ message: 'Invalid email or password' });
  }

  const validPass = await bcrypt.compare(password, user.passwordHash);

  if (!validPass) {
    return res.sendStatus(401).json({ message: 'Invalid email or password' });
  }


  // Make jwt token
  const accessToken = jwt.sign({ email: user.email, name: user.name, userType: user.userType }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

  res.json({
    accessToken: accessToken
  });
});

router.post('/register', async (req, res) => {

  // get data out of body and check if all required fields exist
  const { password, email, name, userType, street, city, state, zip } = req.body;
  if (!password || !email || !name || !userType || !street || !city || !state || !zip) {
    return res.sendStatus(401).json({ message: "Invalid Fields" });
  }

  // Check if email already exists
  const existingUser = db.prepare('SELECT email FROM User WHERE email=?').get(email);
  if (existingUser) {
    return res.sendStatus(409).json({ message: "Email already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  // add seperate creates for different types of accounts
  const createSeller = db.transaction(() => {

    const regUser = db.prepare('INSERT INTO User (name, email, userType) VALUES (?, ?, ?)').run(name, email, userType);

    const userID = regUser.lastInsertRowid;

    db.prepare('INSERT INTO Login (userID, passwordHash) VALUES (?, ?)').run(userID, hash);

    const regAddress = db.prepare('INSERT INTO Address (street, city, state, zip) VALUES (?, ?, ?, ?)').run(street, city, state, zip);

    const addressID = regAddress.lastInsertRowid;

    db.prepare('INSERT INTO Seller (userID, addressID) VALUES (?, ?)').run(userID, addressID);

  });

  const createBuyer = db.transaction(() => {

    const regUser = db.prepare('INSERT INTO User (name, email, userType) VALUES (?, ?, ?)').run(name, email, userType);

    const userID = regUser.lastInsertRowid;

    db.prepare('INSERT INTO Login (userID, passwordHash) VALUES (?, ?)').run(userID, hash);

    const regAddress = db.prepare('INSERT INTO Address (street, city, state, zip) VALUES (?, ?, ?, ?)').run(street, city, state, zip);

    const addressID = regAddress.lastInsertRowid;

    db.prepare('INSERT INTO Buyer (userID, shippingAddressID) VALUES (?, ?)').run(userID, addressID);

  });

  try {
    switch (userType) {
      case Buyer:
        createBuyer();
        break;
      case Seller:
        createSeller();
      default:
        break;
    }
  } catch (error) {
    return res.sendStatus(500).json({ message: "Failed to create Account" });
  }

  res.sendStatus(201).json({
    "Status": "Registered"
  });


});

export default router;
