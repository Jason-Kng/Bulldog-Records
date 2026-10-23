import jwt from 'jsonwebtoken';
import 'dotenv/config';

function authenticateToken(req, res, next) {
  console.log('auth header:', req.headers['authorization']);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401).json({ message: "Invalid Token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    console.log(jwt.decode(token).userID);
    req.user = jwt.decode(token).userID
    next()
  });
}

export default authenticateToken

