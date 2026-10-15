<<<<<<< HEAD
const express = require('express');
const currentSeller = require("./middleware/tempSeller");
const sellerRoutes = require("./routes/seller");
=======
import express from 'express';
>>>>>>> Sprint3-JasonKing
const app = express();
const port = 3000;
import 'dotenv/config';

import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';


app.use(express.json())
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

<<<<<<< HEAD
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use("/api/seller", currentSeller, sellerRoutes);
=======
>>>>>>> Sprint3-JasonKing

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
<<<<<<< HEAD

=======
>>>>>>> Sprint3-JasonKing
