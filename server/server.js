import express from 'express';
const app = express();
const port = 3000;
import 'dotenv/config';

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';


app.use(express.json())
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
