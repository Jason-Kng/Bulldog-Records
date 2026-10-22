import db from './database.js'

const populateData = db.transaction(() => {
  // Need users
  const userQuery = db.prepare(`INSERT INTO User (name, email, userType) VALUES (?, ?, ?)`);
  const user = userQuery.run("Seller 1", "seller1@bulldogrecords.com", "seller");
  const user2 = userQuery.run("Seller 2", "seller2@bulldogrecords.com", "seller");
  const user3 = userQuery.run("Buyer 1", "buyer1@bulldogrecords.com", "buyer");

  const loginQuery = db.prepare(`INSERT INTO Login (userID, passwordHash) VALUES (?, ?)`);
  loginQuery.run(user.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user2.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
  loginQuery.run(user3.lastInsertRowid, "$2b$10$NpBl0ggsyxlOa9jXjjYe5eJBR8DYFnMMIT7zaKLOik9Slg/u/hgNe");
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
  listingQuery.run(seller11.lastInsertRowid, "Gold: Greatest Hits", "ABBA", "1992-09-21", "vinyl", "pop", "731451700712", "new", 3, 5000, "/images/placeholder.png")
  listingQuery.run(seller11.lastInsertRowid, "Midnights: Moonstone Blue Edition", "Taylor Swift", "2022-10-21", "cd", "pop", "602445790098", "used", 2, 2700, "/images/placeholder.png")
  listingQuery.run(seller21.lastInsertRowid, "The Secret of Us", "Gracie Abrams", "2024-06-21", "vinyl", "pop", null, "new", 4, 3500, "/images/placeholder.png");

  listingQuery.run(seller2.lastInsertRowid, "I Barely Know Her", "Sombr", "2025-08-22", "cd", "pop", "093624827702", "new", 5, 1700, "/images/placeholder.png")
  listingQuery.run(seller1.lastInsertRowid, "Rumours", "Fleetwood Mac", "1977-02-04", "vinyl", "rock,pop", "081227970949", "used", 4, 3200, "/images/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Abbey Road", "The Beatles", "1969-09-26", "vinyl", "rock", "602508007448", "new", 2, 4500, "/images/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Nevermind", "Nirvana", "1991-09-24", "cd", "rock,grunge,alternative", "720642442524", "used", 3, 1400, "/images/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Random Access Memories", "Daft Punk", "2013-05-17", "vinyl", "electronic,disco", "888837168618", "new", 5, 3800, "/images/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "Thriller", "Michael Jackson", "1982-11-30", "vinyl", "pop,r&b", "888751437317", "used", 2, 2900, "/images/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "good kid, m.A.A.d city", "Kendrick Lamar", "2012-10-22", "cd", "hip-hop,rap", "602537192268", "new", 6, 1600, "/images/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "The Dark Side of the Moon", "Pink Floyd", "1973-03-01", "vinyl", "rock,progressive rock", "888751842619", "new", 3, 4200, "/images/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "Back to Black", "Amy Winehouse", "2006-10-27", "cd", "soul,r&b", "602517341296", "used", 4, 1300, "/images/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "1989", "Taylor Swift", "2014-10-27", "cd", "pop", "602547092681", "new", 5, 1800, "/images/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "To Pimp a Butterfly", "Kendrick Lamar", "2015-03-15", "vinyl", "hip-hop,jazz,rap", "602547311009", "new", 2, 3600, "/images/placeholder.png");
  listingQuery.run(seller1.lastInsertRowid, "Currents", "Tame Impala", "2015-07-17", "vinyl", "Electronic", "0602547306777", "new", 2, 3500, "/images/currents.jpg");
  listingQuery.run(seller2.lastInsertRowid, "Long Way From Home", "JD Clayton", "2023-01-27", "vinyl", "Country", "0197342060745", "new", 2, 2500, "/images/lwfh.jpg");
  listingQuery.run(seller1.lastInsertRowid, "The Royal Scam", "Steely Dan", "1976-05-31", "vinyl", "Rock", "0602445332489", "used", 2, 3000, "/images/TRS.jpg");
  listingQuery.run(seller2.lastInsertRowid, "GUTS", "Olivia Rodrigo", "2023-09-08", "cd", "pop", null, "used", 3, 1500, "/images/placeholder.png");
  listingQuery.run(seller2.lastInsertRowid, "30", "Adele", "2021-11-19", "vinyl", "pop", null, "open", 2, 3000, "/images/placeholder.png");
  

  console.log("Data population complete.")
})

try {
  populateData()

} catch(e) {
  console.log("Data population failed.");
}


// admin, 3-5 sellers, 3-5 buyers, 10 products per seller
// package for images: multer

// listing: add primary type (Album, Single)
