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

router.post("/checkout", authenticateToken, (req, res) => {
  const userID = req.user.userID;
  const shipping = req.body.shipping;
  const billing = req.body.billing;

  if (
    !shipping ||
    !shipping.street ||
    !shipping.city ||
    !shipping.state ||
    !shipping.zip
  ) {
    return res
      .status(400)
      .json({ message: "Shipping street, city, state, and zip are required" });
  }
  if (
    billing &&
    (!billing.street || !billing.city || !billing.state || !billing.zip)
  ) {
    return res
      .status(400)
      .json({ message: "Billing street, city, state, and zip are required" });
  }

  const cart = db
    .prepare(
      `SELECT Cart.cartID FROM Cart
      JOIN Buyer ON Cart.buyerID = Buyer.buyerID WHERE userID = ?`,
    )
    .get(userID);
  if (!cart) {
    return res.status(400).json({ message: "Your cart is empty" });
  }

  const items = db
    .prepare(
      `SELECT CartItem.itemQuantity, Listing.listingID, Listing.title,
      Listing.price, Listing.stock, Listing.listingStatus
      FROM CartItem JOIN Listing ON CartItem.listingID = Listing.listingID
      WHERE CartItem.cartID = ?`,
    )
    .all(cart.cartID);
  if (items.length === 0) {
    return res.status(400).json({ message: "Your cart is empty" });
  }

  const unavailable = [];
  for (const item of items) {
    if (item.listingStatus !== "active" || item.itemQuantity > item.stock) {
      unavailable.push({
        listingID: item.listingID,
        title: item.title,
        requested: item.itemQuantity,
        available: item.listingStatus === "active" ? item.stock : 0,
      });
    }
  }
  if (unavailable.length > 0) {
    return res.status(400).json({
      message:
        "Some items in your cart are no longer available. Please update your cart.",
      unavailable: unavailable,
    });
  }

  const taxRate = 0.07;

  let subTotal = 0;
  for (const item of items) {
    subTotal = subTotal + item.price * item.itemQuantity;
  }
  const tax = Math.round(subTotal * taxRate);
  const total = subTotal + tax;

  const finishCheckout = db.transaction(() => {
    const buyer = db
      .prepare(`SELECT buyerID FROM Buyer WHERE userID = ?`)
      .get(userID);

    const shippingResult = db
      .prepare(
        `INSERT INTO Address (street, city, state, zip) VALUES (?,?,?,?)`,
      )
      .run(shipping.street, shipping.city, shipping.state, shipping.zip);

    const shippingAddressID = shippingResult.lastInsertRowid;

    let billingAddressID = shippingAddressID;
    if (billing) {
      const billingResult = db
        .prepare(
          `INSERT INTO Address (street, city, state, zip) VALUES (?,?,?,?)`,
        )
        .run(billing.street, billing.city, billing.state, billing.zip);
      billingAddressID = billingResult.lastInsertRowid;
    }

    const orderResult = db
      .prepare(
        `INSERT INTO Orders (buyerID, orderTotalCost, shippingAddress, billingAddress)
        VALUES (?,?,?,?)`,
      )
      .run(buyer.buyerID, total, shippingAddressID, billingAddressID);
    const orderID = orderResult.lastInsertRowid;

    for (const item of items) {
      db.prepare(
        `INSERT INTO OrderItem (orderID, listingID, price, itemQuantity) VALUES (?,?,?,?)`,
      ).run(orderID, item.listingID, item.price, item.itemQuantity);

      db.prepare(
        `UPDATE Listing SET stock = stock - ? WHERE listingID = ?`,
      ).run(item.itemQuantity, item.listingID);
    }

    db.prepare(`DELETE FROM CartItem WHERE cartID = ?`).run(cart.cartID);

    return orderID;
  });

  try {
    const orderID = finishCheckout();
    return res.status(200).json({
      message: "Checkout complete",
      orderID: orderID,
      subTotal: subTotal,
      tax: tax,
      total: total,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Could not complete checkout. Try again." });
  }
});

export default router;
