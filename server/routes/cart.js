import express from "express";
import db from "../database/database.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  const userID = req.user.userID;
  const cart = db
    .prepare(
      `SELECT Cart.cartID FROM Cart 
      JOIN Buyer ON Cart.buyerID = Buyer.buyerID WHERE userID = ?`,
    )
    .get(userID);
  if (!cart) {
    return res.json([]);
  }
  const items = db
    .prepare(
      `SELECT CartItem.cartItemID, CartItem.itemQuantity, Listing.listingID, Listing.title, 
      Listing.price, Listing.photo, Listing.sellerID, Listing.artist, Listing.stock 
      FROM CartItem JOIN Listing ON CartItem.listingID = Listing.listingID
      WHERE CartItem.cartID = ?`,
    )
    .all(cart.cartID);
  res.json(items);
});

router.post("/items", authenticateToken, (req, res) => {
  const listingID = req.body.listingID;
  const quantity = Number(req.body.quantity);

  if (!listingID) {
    return res.status(400).json({ message: "listingID is required" });
  }
  if (!quantity || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Quantity must be greater than zero" });
  }

  const userID = req.user.userID;
  const buyer = db
    .prepare(`SELECT buyerID FROM Buyer WHERE userID = ?`)
    .get(userID);
  if (!buyer) {
    return res.status(403).json({ message: "Only buyers can add to cart" });
  }
  let cartID;

  const cart = db
    .prepare(`SELECT cartID FROM Cart WHERE buyerID = ?`)
    .get(buyer.buyerID);
  if (cart) {
    cartID = cart.cartID;
  } else {
    const newCart = db
      .prepare(`INSERT INTO Cart (buyerID) VALUES (?)`)
      .run(buyer.buyerID);
    cartID = newCart.lastInsertRowid;
  }

  const listing = db
    .prepare(`SELECT stock FROM Listing WHERE listingID = ?`)
    .get(listingID);
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  if (listing.stock === 0) {
    return res.status(400).json({ message: "Listing is out of stock" });
  }

  const cartExisting = db
    .prepare(
      `SELECT cartItemID, itemQuantity FROM CartItem WHERE cartID = ? AND listingID=?`,
    )
    .get(cartID, listingID);

  const alreadyInCart = cartExisting ? cartExisting.itemQuantity : 0;
  if (alreadyInCart + quantity > listing.stock) {
    return res.status(400).json({ message: "Not enough stock" });
  }
  if (cartExisting) {
    db.prepare("UPDATE CartItem SET itemQuantity = ? WHERE cartItemID=?").run(
      alreadyInCart + quantity,
      cartExisting.cartItemID,
    );
  } else {
    db.prepare(
      "INSERT INTO CartItem (cartID, listingID, itemQuantity) VALUES (?,?,?)",
    ).run(cartID, listingID, quantity);
  }
  res.status(201).json({ message: "Added to Cart" });
});

router.delete("/items/:listingID", authenticateToken, (req, res) => {
  const listingID = req.params.listingID;
  const userID = req.user.userID;

  const cart = db
    .prepare(
      `SELECT Cart.cartID FROM Cart 
      JOIN Buyer ON Cart.buyerID = Buyer.buyerID WHERE userID = ?`,
    )
    .get(userID);
  if (!cart) {
    return res.status(404).json({ message: "No Cart" });
  }
  const result = db
    .prepare(
      `DELETE FROM CartItem WHERE CartItem.cartID=? AND CartItem.listingID=?`,
    )
    .run(cart.cartID, listingID);
  if (result.changes === 0) {
    return res.status(404).json({ message: "Cart is Empty" });
  }

  return res.status(200).json({ message: "Item Removed" });
});

export default router;
