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
router.get("/users", requireAdmin, (req, res) => {
  const sellers = db.prepare(`
    SELECT s.sellerID as id, s.accountStatus, s.approvalStatus, u.name, u.email
    FROM Seller s
    JOIN User u ON s.userID = u.userID
    WHERE s.accountStatus IN ('active', 'deactivated')
      AND s.approvalStatus IN ('approved', 'rejected')
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
router.patch("/users/:type/:id/status", requireAdmin, (req, res) => {
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

// manage listings
// every active listing from every seller
router.get("/manage-listings", requireAdmin, (req, res) => {
  const query = db.prepare(`
    SELECT Listing.*, User.name AS sellerName
    FROM Listing
    JOIN Seller ON Listing.sellerID = Seller.sellerID
    JOIN User ON Seller.userID = User.userID
    WHERE Listing.listingStatus != 'pending'
    ORDER BY Listing.listingID
  `);
  const listings = query.all();

  res.json(listings);
});

// // activate or deactivate a listings
router.put("/manage-listings/:id/status", requireAdmin, (req, res) => {
  const { status } = req.body;

  if (status !== "active" && status !== "deactivated") {
    return res.status(400).json({ error: "Invalid status" });
  }

  const query = db.prepare(`
    UPDATE Listing SET listingStatus = ?
    WHERE listingID = ? AND listingStatus IN ('active', 'deactivated')
  `);
  const result = query.run(status, req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Listing not found" });
  }
  res.json({ updated: req.params.id, status });
});

// go to a listing's page
router.get("/manage-listings/:id", requireAdmin, (req, res) => {
  const query = db.prepare(`
    SELECT Listing.*, User.name AS sellerName
    FROM Listing
    JOIN Seller ON Listing.sellerID = Seller.sellerID
    JOIN User ON Seller.userID = User.userID
    WHERE Listing.listingID = ?
  `);
  const listing = query.get(req.params.id);

  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  listing.price = listing.price / 100;
  res.json(listing);
});

// audit orders
router.get("/orders", (req, res) => {
  const query = db.prepare(`
    SELECT
      o.orderID,
      o.dateCreated,
      o.dateShipped,
      o.orderStatus,
      oi.orderItemID,
      oi.listingID,
      l.title,
      oi.price,
      oi.itemQuantity,
      oi.orderItemStatus,
      u.name AS buyerName,
      u.email AS buyerEmail
    FROM Orders o
    JOIN Buyer b ON o.buyerID = b.buyerID
    JOIN User u ON b.userID = u.userID
    JOIN OrderItem oi ON o.orderID = oi.orderID
    JOIN Listing l ON oi.listingID = l.listingID
    ORDER BY o.dateCreated DESC;
  `);

  const orders = query.all();

  res.json(orders);
});

// get one order
router.get("/orders/:id", requireAdmin, (req, res) => {
  const query = db.prepare(`
    SELECT
      o.orderID,
      o.dateCreated,
      o.dateShipped,
      o.orderStatus,
      oi.orderItemID,
      oi.listingID,
      l.title AS listingTitle,
      oi.price,
      oi.itemQuantity,
      oi.orderItemStatus,
      u.name AS buyerName,
      u.email AS buyerEmail,
      sa.street AS shippingStreet,
      sa.city AS shippingCity,
      sa.state AS shippingState,
      sa.zip AS shippingZip,
      sa.country AS shippingCountry,
      ba.street AS billingStreet,
      ba.city AS billingCity,
      ba.state AS billingState,
      ba.zip AS billingZip,
      ba.country AS billingCountry
    FROM Orders o
    JOIN Buyer b ON o.buyerID = b.buyerID
    JOIN User u ON b.userID = u.userID
    JOIN OrderItem oi ON o.orderID = oi.orderID
    JOIN Listing l ON oi.listingID = l.listingID
    JOIN Address sa ON o.shippingAddress = sa.addressID
    JOIN Address ba ON o.billingAddress = ba.addressID
    WHERE o.orderID = ?
  `);

  const order = query.all(req.params.id);

  if (order.length === 0) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});

// cancel order if pending
router.patch("/orders/:id/cancel", requireAdmin, (req, res) => {

    const cancelOrder = db.transaction((orderID) => {

        // only cancel if the order is pending
        const orderQuery = db.prepare(`
            UPDATE Orders
            SET orderStatus = 'canceled'
            WHERE orderID = ?
              AND orderStatus = 'pending'
        `);

        const result = orderQuery.run(orderID);

        if (result.changes === 0) {
            return false;
        }

        // cancel every item
        const itemQuery = db.prepare(`
            UPDATE OrderItem
            SET orderItemStatus = 'canceled'
            WHERE orderID = ?
        `);

        itemQuery.run(orderID);

        return true;
    });

    const success = cancelOrder(req.params.id);

    if (!success) {
        return res.status(400).json({
            error: "Order not found or is no longer pending."
        });
    }

    res.json({ message: "Order and all items canceled successfully." });
});