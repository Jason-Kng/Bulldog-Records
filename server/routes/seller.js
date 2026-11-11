import express from 'express';
import db from '../database/database.js';
// import multer from 'multer';

// const upload = multer({ dest: 'uploads/' })
import upload from '../middleware/upload.js';
import requireApproved from '../middleware/approvedSeller.js';

const router = express.Router();

// routes for seller

// get seller
// will be from api/seller (the BASE = api/seller is in api in client)
// testing on HTTPIE: worked
// router.get("/", (req, res) => {
//   const query = db.prepare("SELECT * FROM Seller WHERE sellerID = ?");
//   const seller = query.get(req.sellerID);

//   if (!seller) {
//     return res.status(404).json({ error: "Seller not found" });
//   }
//   res.json(seller);
// });

// get seller account data for account page
router.get("/", (req, res) => {
  const query = db.prepare("SELECT Seller.sellerID, Seller.userID, User.name, User.email, Seller.approvalStatus, Seller.accountStatus FROM Seller JOIN User ON User.userID = Seller.userID WHERE Seller.sellerID = ?");
  const seller = query.get(req.sellerID);

  if (!seller) {
    return res.status(404).json({ error: "Seller not found" });
  }
  res.json(seller);
});


// create a listing
// testing on HTTPIE: worked
router.post("/listings", requireApproved, upload.single("photo"), (req, res) => {

  // db fields
  const { title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price } = req.body;

  // check required fields are there
  if (!title || !artist || !mediaType || !genre || !condition || !price || !req.file) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  // validate fields: date, ean, stock, price
  if (isNaN(price) || Number(price) <= 0) {
    return res.status(400).json({ error: "Price must be greater than 0" });
  }

   if (isNaN(stock) || Number(stock) < 0 || stock == "") {
    return res.status(400).json({ error: "Stock must be at least 0" });
  }

  if (releaseDate) {
    let dateInput = releaseDate;
    let dateObj = new Date(dateInput);

    const validFormat = /^\d{4}-\d{2}-\d{2}$/.test(releaseDate);
    if (isNaN(dateObj) || !validFormat) {
      return res.status(400).json({ error: "Invalid date, must be (YYYY-MM-DD)" });
    }
    // Source: https://www.freecodecamp.org/news/how-to-validate-a-date-in-javascript/
  }

  // regex
  if (EAN && !/^\d{13}$/.test(EAN)) {
    return res.status(400).json({ error: "EAN must be 13 digits" });
  }


  const priceInCents = Math.round(price * 100);
  const photoPath = `/uploads/${req.file.filename}` || "/images/placeholder.png";
  const listingStatus = 'pending';

  // create entry in db
  try {
    const query = db.prepare(`INSERT INTO Listing (sellerID, title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price, listingStatus, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const values = query.run(req.sellerID, title, artist, releaseDate || null, mediaType, genre, EAN || null, condition, stock || 0, priceInCents, listingStatus, photoPath)

    res.status(201).json({ listingID: values.lastInsertRowid });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }

  // need error handling

});


// get seller's listings
// testing on HTTPIE: worked
router.get("/listings", (req, res) => {
  const query = db.prepare("SELECT * FROM Listing WHERE sellerID = ? AND listingStatus != 'removed'");
  const listings = query.all(req.sellerID);

  listings.forEach((listing) => {
    listing.price = listing.price / 100;
  });

  res.json(listings);
});

// edit the fields of a listing
// testing on HTTPIE: worked
router.put("/listings/:id", requireApproved, upload.single("photo"), (req, res) => {
  // db fields
  let photoPath = req.body.photo;
  const { title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price } = req.body;

  // check required fields are there
  if (!title || !artist || !mediaType || !genre || !condition || !price) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  if (req.file) {
    photoPath = `/uploads/${req.file.filename}` || "/images/placeholder.png";
  }

  try {
    const priceInCents = Math.round(Number(price) * 100);
    const query = db.prepare(`UPDATE Listing SET title = ?, artist = ?, releaseDate = ?, mediaType = ?, genre = ?, EAN = ?, condition = ?, stock = ?, price = ?, photo = ? WHERE listingID = ? AND sellerID = ? AND listingStatus != 'removed'`);
    const values = query.run(title, artist, releaseDate || null, mediaType, genre, EAN || null, condition, stock || 0, priceInCents, photoPath, req.params.id, req.sellerID)

    // would send like updated: 10, confirming update to the listing
    res.status(200).json({ updated: req.params.id });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }

});

// remove listing, soft delete (set status to removed)
// testing on HTTPIE: worked
router.delete("/listings/:id", requireApproved, (req, res) => {
  const query = db.prepare("UPDATE Listing SET listingStatus = 'removed', removedDate = CURRENT_DATE WHERE listingID = ? AND sellerID = ? AND listingStatus != 'removed'");
  const remove = query.run(req.params.id, req.sellerID);

  // same as update, but for remove
  // TODO: need to add res.json to other routes that don't have them, like add/edit
  res.json({ removed: req.params.id });
})

// get one listing from seller
// testing on HTTPIE: worked
router.get("/listings/:id", (req, res) => {
  const query = db.prepare("SELECT * FROM Listing WHERE listingID = ? AND sellerID = ? AND listingStatus != 'removed'");
  // query.get(req.params.id) gets id from URL
  // so listingID is req.params.id and sellerID is req.sellerID
  const listing = query.get(req.params.id, req.sellerID);

  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  listing.price = listing.price / 100;

  res.json(listing);
});

// get seller's orders
router.get("/orders", (req, res) => {
  const query = db.prepare(`SELECT
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
    WHERE l.sellerID = ?
      AND l.listingStatus != 'removed'
    ORDER BY o.dateCreated DESC;`);
  const orders = query.all(req.sellerID);

  res.json(orders);
});

// get one order
router.get("/orders/:id", (req, res) => {
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
    AND l.sellerID = ?
    AND l.listingStatus != 'removed'
  `);

  const order = query.all(req.params.id, req.sellerID);

  if (order.length === 0) {
    return res.status(404).json({ error: "Order not found" });
  }

  console.log(order);

  res.json(order);
});


// get one order's general details
router.get("/orders/details/:id", (req, res) => {
  const query = db.prepare(`
    SELECT
      o.orderID,
      o.dateCreated,
      o.dateShipped,
      o.orderStatus,
      o.orderTotalCost,
      o.shippingAddress,
      u.name AS buyerName,
      u.email AS buyerEmail
    FROM Orders o
    JOIN Buyer b ON o.buyerID = b.buyerID
    JOIN User u ON b.userID = u.userID
    JOIN OrderItem oi ON o.orderID = oi.orderID
    JOIN Listing l ON oi.listingID = l.listingID
    WHERE o.orderID = ?
      AND l.sellerID = ?
      AND l.listingStatus != 'removed'
  `);

  const details = query.all(req.params.id, req.sellerID);

  if (details.length === 0) {
    return res.status(404).json({ error: "Details not found" });
  }


  res.json(details);
});

// get returns for seller
router.get("/returns", (req, res) => {
  const query = db.prepare(`
    SELECT
      r.returnID,
      r.orderID,
      r.orderItemID,
      l.title AS listingTitle,
      oi.price,
      r.returnQuantity,
      u.name AS buyerName,
      u.email AS buyerEmail,
      r.reason,
      r.returnStatus,
      r.dateRequested
    FROM Returns r
    JOIN OrderItem oi ON r.orderItemID = oi.orderItemID
    JOIN Listing l ON oi.listingID = l.listingID
    JOIN Buyer b ON r.buyerID = b.buyerID
    JOIN User u ON b.userID = u.userID
    WHERE l.sellerID = ?
    ORDER BY r.dateRequested DESC
  `);

  const returns = query.all(req.sellerID);

  res.json(returns);
});

// get sales info
router.get("/financial", (req, res) => {
  const query = db.prepare(`
    SELECT
      o.orderID,
      oi.orderItemID,
      l.title AS listingTitle,
      oi.itemQuantity,
      oi.price,
      o.dateCreated
    FROM OrderItem oi
    JOIN Orders o ON oi.orderID = o.orderID
    JOIN Listing l ON oi.listingID = l.listingID
    WHERE l.sellerID = ?
      AND oi.orderItemStatus != 'canceled'
    ORDER BY o.dateCreated DESC
  `);

  res.json(query.all(req.sellerID));
});

export default router;