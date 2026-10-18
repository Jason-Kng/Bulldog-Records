import express from 'express'
const app = express();
const port = 3000;
import 'dotenv/config'
import cors from 'cors'

import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import sellerApprovalRouter from './routes/sellerApproval.js'
import adminRouter from './routes/admin.js'

console.log('Admin router imported')

app.use(cors());

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', sellerApprovalRouter);
app.use('/api/admin', adminRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});