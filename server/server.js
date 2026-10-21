import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import sellerRoutes from './routes/seller.js';
import tempSeller from './middleware/tempSeller.js';
import express from 'express';

const port = 3000;

const app = express();

// app.use(express.json())
// app.use('/api/auth', authRouter);
// app.use('/api/user', userRouter);

app.use(express.json());

app.use("/api/seller", tempSeller, sellerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
