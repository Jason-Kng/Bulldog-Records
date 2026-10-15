import db from './database.js'

const populateData = db.transaction(() => {
  // Need users
  const userQuery = db.prepare(`INSERT INTO User (name, email, userType) VALUES (?, ?, ?)`);
  const user = userQuery.run("Seller 1", "seller1@bulldogrecords.com", "seller");
  const user2 = userQuery.run("Seller 2", "seller2@bulldogrecords.com", "seller");
  const user3 = userQuery.run("Buyer 1", "buyer1@bulldogrecords.com", "buyer");

  // Address
  const addressQuery = db.prepare(`INSERT INTO Address (street, city, state, zip) VALUES (?, ?, ?, ?)`);
  const address = addressQuery.run("665 George Perry St", "Mississippi State", "MS", "39759");

  // Seller
  const sellerQuery = db.prepare(`INSERT INTO Seller (userID, addressID, approvalStatus) VALUES (?, ?, ?)`)
  const seller1 = sellerQuery.run(user.lastInsertRowid, address.lastInsertRowid, "approved")
  const seller2 = sellerQuery.run(user2.lastInsertRowid, address.lastInsertRowid, "approved")

  // Buyer
  const buyerQuery = db.prepare(`INSERT INTO Buyer (userID, shippingAddressID) VALUES (?, ?)`)
  const buyer1 = buyerQuery.run(user3.lastInsertRowid, address.lastInsertRowid)

  // Listing
  const listingQuery = db.prepare(`INSERT INTO Listing (sellerID, title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  listingQuery.run(seller1.lastInsertRowid, "Gold: Greatest Hits", "ABBA", "1992-09-21", "vinyl", "pop", "731451700712", "new", 3, 5000, "/images/placeholder.png")
  listingQuery.run(seller1.lastInsertRowid, "Midnights: Moonstone Blue Edition", "Taylor Swift", "2022-10-21", "cd", "pop", "602445790098", "used", 2, 2700, "/images/placeholder.png")
  listingQuery.run(seller2.lastInsertRowid, "I Barely Know Her", "Sombr", "2025-08-22", "cd", "pop", "093624827702", "new", 5, 1700, "/images/placeholder.png")

  console.log("Data population complete.")
})

try {
  populateData()

} catch(e) {
  console.log("Data population failed.");
}


// admin, 3-5 sellers, 3-5 buyers, 10 products per seller
// package for images: multer
