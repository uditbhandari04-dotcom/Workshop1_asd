const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductId,
  insertProducts,
  putProduct,
  patchProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { productsCache } = require("../middleware/cacheMemory.middleware");
const { validatePostReq } = require("../middleware/validation.middleware");

router.get("/", productsCache, getProducts);
router.get("/:id", productsCache, getProductId);
router.post("/", validatePostReq, productsCache, insertProducts);
router.put("/:id", productsCache, putProduct);
router.patch("/:id", productsCache, patchProduct);
router.delete("/:id", productsCache, deleteProduct);

module.exports = router;
