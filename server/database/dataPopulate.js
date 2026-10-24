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

  const loginQuery = db.prepare(`INSERT INTO Login (userID, passwordHash) VALUES (?, ?)`);
  loginQuery.run(user.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user2.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user3.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user4.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user5.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user6.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user7.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");


  // Address
  const addressQuery = db.prepare(`INSERT INTO Address (street, city, state, zip) VALUES (?, ?, ?, ?)`);
  const address = addressQuery.run("665 George Perry St", "Mississippi State", "MS", "39759");

  // Seller
  const sellerQuery = db.prepare(`INSERT INTO Seller (userID, addressID, approvalStatus) VALUES (?, ?, ?)`)
  const seller1 = sellerQuery.run(user.lastInsertRowid, address.lastInsertRowid, "approved")
  const seller2 = sellerQuery.run(user2.lastInsertRowid, address.lastInsertRowid, "approved")
  const seller3 = sellerQuery.run(user6.lastInsertRowid, address.lastInsertRowid, "approved")
  const seller4 = sellerQuery.run(user7.lastInsertRowid, address.lastInsertRowid, "approved")

  // Buyer
  const buyerQuery = db.prepare(`INSERT INTO Buyer (userID, shippingAddressID) VALUES (?, ?)`)
  const buyer1 = buyerQuery.run(user3.lastInsertRowid, address.lastInsertRowid)
  const buyer2 = buyerQuery.run(user4.lastInsertRowid, address.lastInsertRowid)
  const buyer3 = buyerQuery.run(user5.lastInsertRowid, address.lastInsertRowid)

  // Listing
  const listingQuery = db.prepare(`INSERT INTO Listing (sellerID, title, artist, releaseDate, mediaType, genre, EAN, condition, stock, price, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  listingQuery.run(seller1.lastInsertRowid, "Gold: Greatest Hits", "ABBA", "1992-09-21", "vinyl", "pop", "731451700712", "new", 3, 5000, "/uploads/placeholder.png")
  listingQuery.run(seller1.lastInsertRowid, "Midnights: Moonstone Blue Edition", "Taylor Swift", "2022-10-21", "cd", "pop", "602445790098", "used", 2, 2700, "/uploads/placeholder.png")
  listingQuery.run(seller2.lastInsertRowid, "The Secret of Us", "Gracie Abrams", "2024-06-21", "vinyl", "pop", null, "new", 4, 3500, "/uploads/placeholder.png");

  listingQuery.run(seller2.lastInsertRowid, "I Barely Know Her", "Sombr", "2025-08-22", "cd", "pop", "093624827702", "new", 5, 1700, "/uploads/placeholder.png")
  listingQuery.run(seller1.lastInsertRowid, "Rumours", "Fleetwood Mac", "1977-02-04", "vinyl", "rock", "081227970949", "used", 4, 3200, "/uploads/1792777496613.PNG");
  listingQuery.run(seller1.lastInsertRowid, "Abbey Road", "The Beatles", "1969-09-26", "vinyl", "rock", "602508007448", "new", 2, 4500, "/uploads/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Nevermind", "Nirvana", "1991-09-24", "cd", "alternative", "720642442524", "used", 3, 1400, "/uploads/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Random Access Memories", "Daft Punk", "2013-05-17", "vinyl", "electronic", "888837168618", "new", 5, 3800, "/uploads/1792777510572.png");
  listingQuery.run(seller2.lastInsertRowid, "Thriller", "Michael Jackson", "1982-11-30", "vinyl", "R&B", "888751437317", "used", 2, 2900, "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "good kid, m.A.A.d city", "Kendrick Lamar", "2012-10-22", "cd", "rap", "602537192268", "new", 6, 1600, "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "The Dark Side of the Moon", "Pink Floyd", "1973-03-01", "vinyl", "rock", "888751842619", "new", 3, 4200, "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "Back to Black", "Amy Winehouse", "2006-10-27", "cd", "soul", "602517341296", "used", 4, 1300, "/uploads/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "1989", "Taylor Swift", "2014-10-27", "cd", "pop", "602547092681", "new", 5, 1800, "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "To Pimp a Butterfly", "Kendrick Lamar", "2015-03-15", "vinyl", "rap", "602547311009", "new", 2, 3600, "/uploads/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Currents", "Tame Impala", "2015-07-17", "vinyl", "electronic", "0602547306777", "new", 2, 3500, "/uploads/currents.jpg");
  listingQuery.run(seller2.lastInsertRowid, "Long Way From Home", "JD Clayton", "2023-01-27", "vinyl", "country", "0197342060745", "new", 2, 2500, "/uploads/lwfh.jpg");
  listingQuery.run(seller1.lastInsertRowid, "The Royal Scam", "Steely Dan", "1976-05-31", "vinyl", "rock", "0602445332489", "used", 2, 3000, "/uploads/TRS.jpg");
  listingQuery.run(seller2.lastInsertRowid, "GUTS", "Olivia Rodrigo", "2023-09-08", "cd", "pop", null, "used", 3, 1500, "/uploads/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "30", "Adele", "2021-11-19", "vinyl", "pop", null, "open", 2, 3000, "/uploads/placeholder.png");

  listingQuery.run(seller3.lastInsertRowid, "The Rise and Fall of a Midwest Princess", "Chappell Roan", "2023-09-22", "vinyl", "pop", null, "new", 3, 3200, "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "AM", "Arctic Monkeys", "2013-09-09", "cd", "alternative", "887654861229", "used", 2, 1200, "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "Blue Train", "John Coltrane", "1957-09-15", "vinyl", "jazz", "602547194027", "new", 4, 2800, "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "Golden Hour", "Kacey Musgraves", "2018-03-30", "cd", "country", "602567133298", "used", 2, 1400, "/uploads/placeholder.png");
  listingQuery.run(seller3.lastInsertRowid, "Discovery", "Daft Punk", "2001-03-12", "vinyl", "electronic", "724384960019", "new", 3, 3400, "/uploads/placeholder.png");

  listingQuery.run(seller4.lastInsertRowid, "SOUR", "Olivia Rodrigo", "2021-05-21", "cd", "pop", null, "new", 5, 1600, "/uploads/placeholder.png");
  listingQuery.run(seller4.lastInsertRowid, "Led Zeppelin IV", "Led Zeppelin", "1971-11-08", "vinyl", "rock", "081227969857", "used", 2, 3000, "/uploads/placeholder.png");
  listingQuery.run(seller4.lastInsertRowid, "The Miseducation of Lauryn Hill", "Lauryn Hill", "1998-08-25", "cd", "R&B", "074646902225", "new", 3, 1800, "/uploads/placeholder.png");
  listingQuery.run(seller4.lastInsertRowid, "Kind of Blue", "Miles Davis", "1959-08-17", "vinyl", "jazz", "888751119517", "used", 2, 2600, "/uploads/placeholder.png");
  listingQuery.run(seller4.lastInsertRowid, "Un Verano Sin Ti", "Bad Bunny", "2022-05-06", "vinyl", "latin", null, "new", 4, 3500, "/uploads/placeholder.png");

  console.log("Data population complete.")
})

try {
  populateData()

} catch (e) {
  console.log("Data population failed.");
}


// admin, 3-5 sellers, 3-5 buyers, 10 products per seller
// package for images: multer

// listing: add primary type (Album, Single)
