const validatePostReq = (req, res, next) => {
  const { name, price } = req.body || {};

  const isInvalidName = name === undefined || typeof name !== "string" || name.trim() === "";
  const isInvalidPrice = !Number.isInteger(price);

  if (isInvalidName || isInvalidPrice) {
    return res.status(400).send("error");
  }

  next();
};

module.exports = {
  validatePostReq,
};
