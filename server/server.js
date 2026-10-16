import express from 'express';
const app = express();
const port = 3000;
import 'dotenv/config';
import cors from 'cors';

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';

import sellerApprovalRouter from './routes/sellerApproval.js';

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use('/api/admin', sellerApprovalRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});