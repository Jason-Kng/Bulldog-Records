import express from 'express';
import db from '../database/database.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  console.log('req.user', req.user);
  const userType = db.prepare("SELECT userType FROM User Where name = ?");
  const row = userType.get(req.user.name);
  res.status(row ? 200 : 404).json(row ?? { error: "User Not Found" });

});

export default router;