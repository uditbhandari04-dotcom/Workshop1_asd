const productServices = require("../services/products.service");

const getProducts = async (req, res) => {
  const products = await productServices.QueryProduct(req.query);
  res.json(products);
};

const getProductId = async (req, res) => {
  const targetId = Number(req.params.id);
  const product = await productServices.findProductId(targetId);
  res.json(product);
};

const insertProducts = async (req, res) => {
  const newProduct = await productServices.insertIntoProducts(req.body);
  res.status(201).json(newProduct);
};

const putProduct = async (req, res) => {
  const targetId = Number(req.params.id);
  const { name, price } = req.body;
  const updatedProduct = await productServices.putIntoProduct({
    id: targetId,
    name,
    price: Number(price),
  });
  res.status(200).json(updatedProduct);
};

const patchProduct = async (req, res) => {
  const targetId = Number(req.params.id);
  const updatedProduct = await productServices.patchIntoProduct(req.body, targetId);
  res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const targetId = Number(req.params.id);
  const deletedProduct = await productServices.deleteFromProduct(targetId);
  res.status(200).json(deletedProduct);
};

module.exports = {
  getProducts,
  getProductId,
  insertProducts,
  putProduct,
  patchProduct,
  deleteProduct,
};
