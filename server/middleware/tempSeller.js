// since auth and login are not yet implemented, use sellerID 1
// this file should be replaced with actual auth and login logic

// function tempSeller(req, res, next) {
//   req.sellerID = 1;
//   next()
// }

// export default tempSeller;

import jwt from "jsonwebtoken";
import db from "../database/database.js";

function currentSeller(req, res, next) {
  // header looks like: "Bearer <token>"
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Not logged in" });
  }
  const token = header.split(" ")[1];

  try {
    // throws an error if the token is fake or expired
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // find the seller that belongs to this email
    const query = db.prepare(`
      SELECT Seller.sellerID, Seller.approvalStatus
      FROM Seller
      JOIN User ON Seller.userID = User.userID
      WHERE User.email = ?
    `);
    const seller = query.get(payload.email);

    if (!seller) {
      return res.status(403).json({ error: "This user is not a seller" });
    }

    req.sellerID = seller.sellerID;
    req.approvalStatus = seller.approvalStatus;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export default currentSeller;