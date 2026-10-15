import express from 'express';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import sellerRoutes from './routes/seller.js';
import currentSeller from './middleware/tempSeller.js';

const port = 3000;
const app = express();

app.use(express.json())
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use(express.json());

app.use("/api/seller", currentSeller, sellerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
