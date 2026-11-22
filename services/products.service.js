const database = require("../database/db");

const QueryProduct = async (query = {}) => {
  let products = await database.delayReadData();
  const { name, minPrice, maxPrice } = query;

  const parsedMin = Number(minPrice);
  const parsedMax = Number(maxPrice);

  if (name && name.trim() !== "") {
    const search = name.trim().toLowerCase();
    products = products.filter((item) =>
      item.name.toLowerCase().includes(search)
    );
  }

  if (minPrice && typeof parsedMin === "number" && Number.isFinite(parsedMin)) {
    products = products.filter((item) => item.price >= parsedMin);
  }

  if (maxPrice && typeof parsedMax === "number" && Number.isFinite(parsedMax)) {
    products = products.filter((item) => item.price <= parsedMax);
  }

  return products;
};

const findProductId = async (id) => {
  const products = await database.delayReadData();
  return products.find((item) => item.id === id);
};

const insertIntoProducts = async ({ name, price }) => {
  const products = await database.delayReadData();
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);
  await database.writeIntoFile(products);
  return newProduct;
};

const putIntoProduct = async (newData) => {
  const products = await database.delayReadData();
  const updatedProducts = products.map((item) =>
    item.id === newData.id ? newData : item
  );

  await database.writeIntoFile(updatedProducts);
  return newData;
};

const patchIntoProduct = async (data, id) => {
  const products = await database.delayReadData();
  const editableFields = ["name", "price"];
  let patchedItem;

  const updatedProducts = products.map((item) => {
    if (item.id === id) {
      editableFields.forEach((field) => {
        if (data[field] !== undefined) {
          item[field] = data[field];
        }
      });
      patchedItem = item;
    }
    return item;
  });

  await database.writeIntoFile(updatedProducts);
  return patchedItem;
};

const deleteFromProduct = async (id) => {
  const products = await database.delayReadData();
  const deletedItem = products.find((item) => item.id === id);
  const remainingProducts = products.filter((item) => item.id !== id);

  await database.writeIntoFile(remainingProducts);
  return deletedItem;
};

module.exports = {
  QueryProduct,
  findProductId,
  insertIntoProducts,
  putIntoProduct,
  patchIntoProduct,
  deleteFromProduct,
};
