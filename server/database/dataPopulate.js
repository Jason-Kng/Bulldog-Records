import db from './database.js'

const populateData = db.transaction(() => {
  // Need users
  const userQuery = db.prepare(`INSERT INTO User (name, email, userType) VALUES (?, ?, ?)`);
  const user = userQuery.run("Seller 1", "seller1@bulldogrecords.com", "seller");
  const user2 = userQuery.run("Seller 2", "seller2@bulldogrecords.com", "seller");
  const user3 = userQuery.run("Buyer 1", "buyer1@bulldogrecords.com", "buyer");
  const user4 = userQuery.run("Buyer 2", "buyer2@bulldogrecords.com", "buyer");
  const user5 = userQuery.run("Buyer 3", "buyer3@bulldogrecords.com", "buyer");
  const user6 = userQuery.run("Seller 3", "seller3@bulldogrecords.com", "seller");
  const user7 = userQuery.run("Seller 4", "seller4@bulldogrecords.com", "seller");
  const user8 = userQuery.run("Admin", "admin@bulldogrecords.com", "admin");
  const user9 = userQuery.run("Seller 5", "seller5@bulldogrecords.com", "seller");

  const loginQuery = db.prepare(`INSERT INTO Login (userID, passwordHash) VALUES (?, ?)`);
  loginQuery.run(user.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user2.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user3.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user4.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user5.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user6.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user7.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user8.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user9.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");


  // Address
  const addressQuery = db.prepare(`INSERT INTO Address (street, city, state, zip) VALUES (?, ?, ?, ?)`);
  const address = addressQuery.run("665 George Perry St", "Mississippi State", "MS", "39759");

  // Seller
  const sellerQuery = db.prepare(`INSERT INTO Seller (userID, addressID, approvalStatus) VALUES (?, ?, ?)`)
  const seller1 = sellerQuery.run(user.lastInsertRowid, address.lastInsertRowid, "approved")
  const seller2 = sellerQuery.run(user2.lastInsertRowid, address.lastInsertRowid, "approved")
  const seller3 = sellerQuery.run(user6.lastInsertRowid, address.lastInsertRowid, "approved")
  const seller4 = sellerQuery.run(user7.lastInsertRowid, address.lastInsertRowid, "pending")
  const seller5 = sellerQuery.run(user9.lastInsertRowid, address.lastInsertRowid, "pending")

  // Buyer
  const buyerQuery = db.prepare(`INSERT INTO Buyer (userID, shippingAddressID) VALUES (?, ?)`)
  const buyer1 = buyerQuery.run(user3.lastInsertRowid, address.lastInsertRowid)
  const buyer2 = buyerQuery.run(user4.lastInsertRowid, address.lastInsertRowid)
  const buyer3 = buyerQuery.run(user5.lastInsertRowid, address.lastInsertRowid)

  // Listing
  const listingQuery = db.prepare(`INSERT INTO Listing (sellerID, title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price, listingStatus, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  listingQuery.run(seller1.lastInsertRowid, "Gold: Greatest Hits", "ABBA", "1992-09-21", "vinyl", "pop", "731451700712", "new", 3, 5000, "pending", "/uploads/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Midnights: Moonstone Blue Edition", "Taylor Swift", "2022-10-21", "cd", "pop", "602445790098", "used", 2, 2700, "pending", "/uploads/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Rumours", "Fleetwood Mac", "1977-02-04", "vinyl", "rock", "081227970949", "used", 4, 3200, "active", "/uploads/1792777496613.PNG");
  listingQuery.run(seller1.lastInsertRowid, "Abbey Road", "The Beatles", "1969-09-26", "vinyl", "rock", "602508007448", "new", 2, 4500, "deactivated", "/uploads/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Nevermind", "Nirvana", "1991-09-24", "cd", "alternative", "720642442524", "used", 3, 1400, "active", "/uploads/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Random Access Memories", "Daft Punk", "2013-05-17", "vinyl", "electronic", "888837168618", "new", 5, 3800, "active", "/uploads/1792777510572.png");
  listingQuery.run(seller1.lastInsertRowid, "1989", "Taylor Swift", "2014-10-27", "cd", "pop", "602547092681", "new", 5, 1800, "active", "/uploads/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Currents", "Tame Impala", "2015-07-17", "vinyl", "electronic", "0602547306777", "new", 2, 3500, "active", "/uploads/currents.jpg");
  listingQuery.run(seller1.lastInsertRowid, "The Royal Scam", "Steely Dan", "1976-05-31", "vinyl", "rock", "0602445332489", "used", 2, 3000, "active", "/uploads/TRS.jpg");

  listingQuery.run(seller2.lastInsertRowid, "The Secret of Us", "Gracie Abrams", "2024-06-21", "vinyl", "pop", null, "new", 4, 3500, "pending", "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "I Barely Know Her", "Sombr", "2025-08-22", "cd", "pop", "093624827702", "new", 5, 1700, "pending", "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "Thriller", "Michael Jackson", "1982-11-30", "vinyl", "R&B", "888751437317", "used", 2, 2900, "active", "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "good kid, m.A.A.d city", "Kendrick Lamar", "2012-10-22", "cd", "rap", "602537192268", "new", 6, 1600, "active", "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "The Dark Side of the Moon", "Pink Floyd", "1973-03-01", "vinyl", "rock", "888751842619", "new", 3, 4200, "active", "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "Back to Black", "Amy Winehouse", "2006-10-27", "cd", "soul", "602517341296", "used", 4, 1300, "active", "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "To Pimp a Butterfly", "Kendrick Lamar", "2015-03-15", "vinyl", "rap", "602547311009", "new", 2, 3600, "active", "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "Long Way From Home", "JD Clayton", "2023-01-27", "vinyl", "country", "0197342060745", "new", 2, 2500, "active", "/uploads/lwfh.jpg");
  listingQuery.run(seller2.lastInsertRowid, "GUTS", "Olivia Rodrigo", "2023-09-08", "cd", "pop", null, "used", 3, 1500, "active", "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "30", "Adele", "2021-11-19", "vinyl", "pop", null, "open", 2, 3000, "active", "/uploads/placeholder.png");

  listingQuery.run(seller3.lastInsertRowid, "The Rise and Fall of a Midwest Princess", "Chappell Roan", "2023-09-22", "vinyl", "pop", null, "new", 3, 3200, "pending", "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "AM", "Arctic Monkeys", "2013-09-09", "cd", "alternative", "887654861229", "used", 2, 1200, "pending", "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "Blue Train", "John Coltrane", "1957-09-15", "vinyl", "jazz", "602547194027", "new", 4, 2800, "active", "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "Golden Hour", "Kacey Musgraves", "2018-03-30", "cd", "country", "602567133298", "used", 2, 1400, "active", "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "Discovery", "Daft Punk", "2001-03-12", "vinyl", "electronic", "724384960019", "new", 3, 3400, "active", "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "SOUR", "Olivia Rodrigo", "2021-05-21", "cd", "pop", null, "new", 5, 1600, "pending", "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "Led Zeppelin IV", "Led Zeppelin", "1971-11-08", "vinyl", "rock", "081227969857", "used", 2, 3000, "pending", "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "The Miseducation of Lauryn Hill", "Lauryn Hill", "1998-08-25", "cd", "R&B", "074646902225", "new", 3, 1800, "active", "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "Kind of Blue", "Miles Davis", "1959-08-17", "vinyl", "jazz", "888751119517", "used", 2, 2600, "active", "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "Un Verano Sin Ti", "Bad Bunny", "2022-05-06", "vinyl", "latin", null, "new", 4, 3500, "active", "/uploads/placeholder.png");

  // Orders
  const orderQuery = db.prepare(`INSERT INTO Orders (dateCreated, dateShipped, buyerID, orderTotalCost, shippingAddress, billingAddress, orderStatus) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const orderItemQuery = db.prepare(`INSERT INTO OrderItem (listingID, orderID, price, itemQuantity, orderItemStatus) VALUES (?, ?, ?, ?, ?)`);

  // Seller 1, order 1 (pending): Rumours x1 + Abbey Road x2 = 3200 + 9000
  const order1 = orderQuery.run("2026-10-20 14:30:00", null, buyer1.lastInsertRowid, 12200, address.lastInsertRowid, address.lastInsertRowid, "pending");
  orderItemQuery.run(3, order1.lastInsertRowid, 3200, 1, "pending");
  orderItemQuery.run(4, order1.lastInsertRowid, 4500, 2, "pending");

  // Seller 1, order 2 (shipped): Nevermind x1 + 1989 x1 = 1400 + 1800
  const order2 = orderQuery.run("2026-10-15 09:10:00", "2026-10-17 11:00:00", buyer2.lastInsertRowid, 3200, address.lastInsertRowid, address.lastInsertRowid, "shipped");
  orderItemQuery.run(5, order2.lastInsertRowid, 1400, 1, "shipped");
  orderItemQuery.run(7, order2.lastInsertRowid, 1800, 1, "shipped");

  // Seller 2, order 3 (delivered): Thriller x1 + good kid x2 = 2900 + 3200
  const order3 = orderQuery.run("2026-10-05 16:45:00", "2026-10-07 10:20:00", buyer3.lastInsertRowid, 6100, address.lastInsertRowid, address.lastInsertRowid, "delivered");
  orderItemQuery.run(1, order3.lastInsertRowid, 2900, 1, "delivered");
  orderItemQuery.run(2, order3.lastInsertRowid, 1600, 2, "delivered");

  // Seller 2, order 4 (pending): Dark Side of the Moon x1 = 4200
  const order4 = orderQuery.run("2026-10-22 12:00:00", null, buyer1.lastInsertRowid, 4200, address.lastInsertRowid, address.lastInsertRowid, "canceled");
  orderItemQuery.run(8, order4.lastInsertRowid, 4200, 1, "canceled");
  orderItemQuery.run(9, order4.lastInsertRowid, 4200, 1, "canceled");

  const order5 = orderQuery.run("2026-10-22 12:00:00", null, buyer1.lastInsertRowid, 4200, address.lastInsertRowid, address.lastInsertRowid, "pending");
  orderItemQuery.run(6, order5.lastInsertRowid, 4200, 1, "pending");

    // Delivered orders for returns
  // Seller 1: Random Access Memories x1 + Currents x1 = 3800 + 3500
  const order6 = orderQuery.run("2026-10-10 11:00:00", "2026-10-12 09:30:00", buyer2.lastInsertRowid, 7300, address.lastInsertRowid, address.lastInsertRowid, "delivered");
  const order6Item1 = orderItemQuery.run(6, order6.lastInsertRowid, 3800, 1, "delivered");
  const order6Item2 = orderItemQuery.run(8, order6.lastInsertRowid, 3500, 1, "delivered");

  // Seller 2: Thriller x1 + Back to Black x2 = 2900 + 2600
  const order7 = orderQuery.run("2026-10-08 15:20:00", "2026-10-10 13:45:00", buyer3.lastInsertRowid, 5500, address.lastInsertRowid, address.lastInsertRowid, "delivered");
  const order7Item1 = orderItemQuery.run(12, order7.lastInsertRowid, 2900, 1, "delivered");
  const order7Item2 = orderItemQuery.run(15, order7.lastInsertRowid, 1300, 2, "delivered");

  // Seller 2: good kid, m.A.A.d city x1 + The Dark Side of the Moon x1 = 1600 + 4200
  const order8 = orderQuery.run("2026-10-12 10:05:00", "2026-10-14 08:50:00", buyer1.lastInsertRowid, 5800, address.lastInsertRowid, address.lastInsertRowid, "delivered");
  const order8Item1 = orderItemQuery.run(13, order8.lastInsertRowid, 1600, 1, "delivered");
  const order8Item2 = orderItemQuery.run(14, order8.lastInsertRowid, 4200, 1, "delivered");

  // Returns
  const returnQuery = db.prepare(`INSERT INTO Returns (orderID, orderItemID, buyerID, reason, returnQuantity, returnStatus, dateRequested) VALUES (?, ?, ?, ?, ?, ?, ?)`);

  // Seller 1 returns
  returnQuery.run(order6.lastInsertRowid, order6Item1.lastInsertRowid, buyer2.lastInsertRowid, "The album cover was damaged when it arrived.", 1, "pending", "2026-10-28 10:15:00");
  returnQuery.run(order6.lastInsertRowid, order6Item2.lastInsertRowid, buyer2.lastInsertRowid, "The item did not match the listing description.", 1, "refunded", "2026-10-20 14:40:00");

  // Seller 2 returns
  returnQuery.run(order7.lastInsertRowid, order7Item1.lastInsertRowid, buyer3.lastInsertRowid, "The record has scratches that were not mentioned in the listing.", 1, "pending", "2026-10-30 09:00:00");
  returnQuery.run(order7.lastInsertRowid, order7Item2.lastInsertRowid, buyer3.lastInsertRowid, "I ordered two copies by mistake and only need one.", 1, "rejected", "2026-10-22 16:25:00");
  returnQuery.run(order8.lastInsertRowid, order8Item2.lastInsertRowid, buyer1.lastInsertRowid, "The case was cracked when the package arrived.", 1, "refunded", "2026-10-25 12:10:00");

  console.log("Data population complete.")
})

try {
  populateData();
  
} catch (e) {
  console.error("Data population failed:", e);
}


// admin, 3-5 sellers, 3-5 buyers, 10 products per seller
// package for images: multer

// listing: add primary type (Album, Single)
