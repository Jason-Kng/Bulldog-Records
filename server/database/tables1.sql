--User Table
CREATE TABLE IF NOT EXISTS "User" (
    "userID"    INTEGER,
    "name" TEXT NOT NULL,
    "email"    TEXT NOT NULL UNIQUE COLLATE NOCASE,
    "registerDate"    TEXT DEFAULT CURRENT_TIMESTAMP,
    "userType"    TEXT NOT NULL CHECK (userType IN ('buyer', 'seller', 'admin')),
    PRIMARY KEY("userID")
);
--Login Table
CREATE TABLE IF NOT EXISTS "Login" (
    "loginID"    INTEGER,
    "userID"    INTEGER NOT NULL UNIQUE REFERENCES User(userID) on DELETE CASCADE,
    "passwordHash" TEXT NOT NULL,
    PRIMARY KEY("loginID")
);
--Address Table
CREATE TABLE IF NOT EXISTS "Address" (
    "addressID"    INTEGER,
    "street" TEXT NOT NULL,
    "city"    TEXT NOT NULL,
    "state"    TEXT NOT NULL, 
    "zip"    TEXT NOT NULL,
    --setting country automatically to USA  
    "country" TEXT NOT NULL DEFAULT 'USA',
    PRIMARY KEY("addressID")
);
--Buyer Table
CREATE TABLE IF NOT EXISTS "Buyer" (
    "buyerID"    INTEGER,
    "userID"    INTEGER NOT NULL UNIQUE REFERENCES User(userID) on DELETE CASCADE,
    "shippingAddressID"    INTEGER NOT NULL REFERENCES Address(addressID) on DELETE RESTRICT,     
    "accountStatus"    TEXT NOT NULL DEFAULT 'active' CHECK (accountStatus IN ('active', 'deactivated', 'banned')),
    "removedDate" TEXT,
    PRIMARY KEY("buyerID")
);
--Seller Table
CREATE TABLE IF NOT EXISTS "Seller" (
    "sellerID"    INTEGER,
    "userID"    INTEGER NOT NULL UNIQUE REFERENCES User(userID) on DELETE CASCADE,
    "addressID"    INTEGER NOT NULL REFERENCES Address(addressID) on DELETE RESTRICT,
    --setting seller approval status automatically to pending  
    "approvalStatus"    TEXT NOT NULL DEFAULT 'pending' CHECK (approvalStatus IN ('approved', 'rejected','pending')),
    "accountStatus"    TEXT NOT NULL DEFAULT 'active' CHECK (accountStatus IN ('active', 'deactivated', 'banned')),
    "removedDate" TEXT,
    PRIMARY KEY("sellerID")
);
--Listing Table
CREATE TABLE IF NOT EXISTS "Listing" (
    "listingID"    INTEGER,
    "sellerID"    INTEGER NOT NULL REFERENCES Seller(sellerID) on DELETE RESTRICT,
    "title"     TEXT NOT NULL,
    "artist"    TEXT NOT NULL,
    "releaseDate"   TEXT,
    "mediaType"    TEXT NOT NULL CHECK (mediaType IN ('cd', 'vinyl', 'cassette', 'other')),
    "genre"     TEXT NOT NULL,
    "EAN"   TEXT,
    "condition"     TEXT NOT NULL CHECK (condition IN ('new', 'used', 'open')),
    "stock"     INTEGER NOT NULL DEFAULT 0 CHECK (stock>=0),
    --price is in cents so 2.49 is 249
    "price"     INTEGER NOT NULL CHECK (price>0),
    "listingStatus"     TEXT NOT NULL DEFAULT 'active' CHECK (listingStatus IN ('active', 'deactivated', 'removed', 'soldOut')),
    --photo set to text to hold path or URL
    "photo" TEXT NOT NULL,
    "isVerified" INTEGER NOT NULL DEFAULT 0,
    "removedDate" TEXT,
    PRIMARY KEY("listingID")
);
CREATE TABLE IF NOT EXISTS "Cart" (
    "cartID"    INTEGER,
    "buyerID" INTEGER NOT NULL UNIQUE REFERENCES Buyer(buyerID) on DELETE CASCADE,
    PRIMARY KEY("cartID")
);
CREATE TABLE IF NOT EXISTS "CartItem" (
    "cartItemID"    INTEGER,
    "listingID" INTEGER NOT NULL REFERENCES Listing(listingID),
    "cartID" INTEGER NOT NULL REFERENCES Cart(cartID) on DELETE CASCADE,
    "itemQuantity" INTEGER NOT NULL CHECK (itemQuantity>0), 
    PRIMARY KEY("cartItemID"),
    UNIQUE ("cartID", "listingID")
);
CREATE TABLE IF NOT EXISTS "Cart" (
    "cartID"    INTEGER,
    "buyerID" INTEGER NOT NULL UNIQUE REFERENCES Buyer(buyerID) on DELETE CASCADE,
    PRIMARY KEY("cartID")
);
CREATE TABLE IF NOT EXISTS "CartItem" (
    "cartItemID"    INTEGER,
    "listingID" INTEGER NOT NULL REFERENCES Listing(listingID),
    "cartID" INTEGER NOT NULL REFERENCES Cart(cartID) on DELETE CASCADE,
    "itemQuantity" INTEGER NOT NULL CHECK (itemQuantity>0), 
    PRIMARY KEY("cartItemID"),
    UNIQUE ("cartID", "listingID")
);

