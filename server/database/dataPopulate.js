const db = require("./database");

// Need users
const userQuery = db.prepare(`INSERT INTO User (name, email, userType) VALUES (?, ?, ?)`);
const user = userQuery.run("Seller 1", "seller1@bulldogrecords.com", "seller");

// Address
const addressQuery = db.prepare(`INSERT INTO Address (street, city, state, zip) VALUES (?, ?, ?, ?)`);
const address = addressQuery.run("665 George Perry St", "Mississippi State", "MS", "39759");

// Seller
const sellerQuery = db.prepare(`INSERT INTO Seller (userID, addressID, approvalStatus) VALUES (?, ?, ?)`)
const seller = sellerQuery.run(user.lastInsertRowid, address.lastInsertRowid, "approved")

// Listing
const listingQuery = db.prepare(`INSERT INTO Listing (sellerID, title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
listingQuery.run(seller.lastInsertRowid, "Gold: Greatest Hits", "ABBA", "1992-09-21", "vinyl", "pop", "731451700712", "new", 3, 5000, "/images/placeholder.png")
listingQuery.run(seller.lastInsertRowid, "Midnights: Moonstone Blue Edition", "Taylor Swift", "2022-10-21", "cd", "pop", "602445790098", "used", 2, 2700, "/images/placeholder.png")
listingQuery.run(seller.lastInsertRowid, "I Barely Know Her", "Sombr", "2025-08-22", "cd", "pop", "093624827702", "new", 5, 1700, "/images/placeholder.png")

console.log("Data population complete.")