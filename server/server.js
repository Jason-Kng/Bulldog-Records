import express from "express";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import listingRouter from "./routes/listing.js";
import sellerRoutes from "./routes/seller.js";
import cartRouter from "./routes/cart.js";
import currentSeller from "./middleware/tempSeller.js";
import 'dotenv/config';
import cors from 'cors';

import sellerApprovalRouter from './routes/sellerApproval.js';
import adminRouter from './routes/admin.js';
import adminListingsRouter from './routes/listingApproval.js';

const app = express();
const port = 3000;

app.use(cors());
app.use("/uploads", express.static("uploads"))

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', sellerApprovalRouter);
app.use('/api/admin', adminRouter);

app.use("/api/listing", listingRouter);
app.use("/api/seller", currentSeller, sellerRoutes);
app.use("/api/cart", cartRouter);
app.use('/api/admin', adminListingsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
