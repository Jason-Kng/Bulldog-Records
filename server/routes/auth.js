import express from 'express';
import jwt from 'jsonwebtoken';
import db from "../database/database.js"

const router = express.Router();

router.post('/login', (req, res) => {
  // Authenticate
  const user = db.prepare('SELECT * FROM User WHERE name = ?').get(req.body.username);
  if (!user) {
    return res.sendStatus(403);
  }

  const accessToken = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

  res.json({
    accessToken: accessToken
  });
});

export default router;
