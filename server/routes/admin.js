import express from 'express'
import db from '../database/database.js'
import { requireAdmin } from './adminAuth.js'

console.log('Admin router loaded');

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Admin router is working.' });
});

router.get('/dashboard/stats', requireAdmin, (req, res) => {
    try {
        const totalUsers = db.prepare(`
            SELECT COUNT(*) AS count FROM User
        `).get().count;

        const totalSellers = db.prepare(`
            SELECT COUNT(*) AS count FROM Seller
        `).get().count;

        const pendingSellers = db.prepare(`
            SELECT COUNT(*) AS count
            FROM Seller
            WHERE approvalStatus = 'pending'
        `).get().count;

        res.json({
            totalUsers,
            totalSellers,
            pendingSellers
        });
    } catch (error) {
        console.error('Failed to load admin dashboard statistics:', error);
        res.status(500).json({
            error: 'Failed to load dashboard statistics'
        });
    }
});

// manage users

// active sellers and active buyers
router.get("/users", (req, res) => {
  const sellers = db.prepare(`
    SELECT s.sellerID as id, s.accountStatus, u.name, u.email
    FROM Seller s
    JOIN User u ON s.userID = u.userID
    WHERE s.accountStatus IN ('active', 'deactivated')
      AND s.approvalStatus = 'approved'
    ORDER BY u.name
  `).all();

  const buyers = db.prepare(`
    SELECT b.buyerID as id, b.accountStatus, u.name, u.email
    FROM Buyer b
    JOIN User u ON b.userID = u.userID
    WHERE b.accountStatus IN ('active', 'deactivated')
    ORDER BY u.name
  `).all();


  res.json({ sellers, buyers });
});

// activate or deactivate a seller or buyer
router.patch("/users/:type/:id/status", (req, res) => {
  const { type, id } = req.params;
  const { status } = req.body;

  if (status !== "active" && status !== "deactivated") {
    return res.status(400).json({ error: "Invalid status" });
  }

  let table;
  let user_id;
  if (type === "seller") {
    table = "Seller";
    user_id = "sellerID";
  } else if (type === "buyer") {
    table = "Buyer";
    user_id = "buyerID";
  } else {
    return res.status(400).json({ error: "Invalid user type" });
  }

  const removedDate = status === "deactivated" ? new Date().toISOString() : null;

  const result = db
    .prepare(`UPDATE ${table} SET accountStatus = ?, removedDate = ? WHERE ${user_id} = ?`)
    .run(status, removedDate, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ success: true });
});
export default router;