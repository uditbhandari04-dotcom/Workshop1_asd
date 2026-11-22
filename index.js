const express = require("express");
const productRouter = require("./routes/products.router");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
