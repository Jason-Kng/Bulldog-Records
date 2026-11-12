import db from "../database/database.js";

function requireActive(req, res, next) {
  const seller = db
    .prepare(`SELECT accountStatus FROM Seller WHERE sellerID = ?`)
    .get(req.sellerID);

  if (!seller || seller.accountStatus !== "active") {
    return res.status(403).json({ error: "Seller account is not active. You cannot create new listings." });
  }

  next();
}

export default requireActive;