import express from 'express';
import db from '../database/database.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post("/", authenticateToken, (req, res) => {
  console.log("Request: ", req);

  const orderObj = req.body;

  console.log("order: ", orderObj);
  console.log("user:", req.user);



  const returnQuery = db.transaction(() => {
    //const updateQuery = db.prepare(`UPDATE OrderItem SET orderItemStatus = 'returned', itemQuantity = (IIF(OrderItem.itemQuantity > 1, OrderItem.itemQuantity - ?, OrderItem.itemQuantity)) WHERE orderID = ? AND listingID = ?`);
    const updateQuery = db.prepare(`
                                    UPDATE OrderItem SET orderItemStatus = 'returned'
                                    WHERE orderID = ? AND listingID = ? AND orderID IN (
                                        SELECT Orders.orderID
                                        FROM Orders
                                        JOIN Buyer ON Orders.buyerID = Buyer.buyerID
                                        WHERE Buyer.userID = ?
                                    )
                                  `);
    const insertQuery = db.prepare(`
                                    INSERT INTO Returns (
                                        orderID, orderItemID, buyerID, reason, returnQuantity, returnStatus
                                    ) VALUES (?, ?, (
                                        SELECT buyerID FROM Buyer
                                        WHERE userID = ?
                                    ), ?, ?, ?)
                                  `);

    updateQuery.run(orderObj.orderID, orderObj.listingID, req.user.userID);
    insertQuery.run(orderObj.orderID, orderObj.orderItemID, req.user.userID, orderObj.reason, orderObj.quantity, 'refunded');
  })

  try {
    returnQuery();
    return res.status(201).json({ message: "Return processed successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to process return" });
  }


})

export default router;

