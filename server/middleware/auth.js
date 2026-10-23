import jwt from 'jsonwebtoken';
import 'dotenv/config';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401).json({ message: "Invalid Token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
    if (err) return res.sendStatus(403).json({ message: "Invalid or expired token" });

    req.user = usr
    next()
  });
}

export default authenticateToken
