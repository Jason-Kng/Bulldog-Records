const express = require('express');
const currentSeller = require("./middleware/tempSeller");
const sellerRoutes = require("./routes/seller");
const app = express();
const port = 3000;

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use("/api/seller", currentSeller, sellerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

