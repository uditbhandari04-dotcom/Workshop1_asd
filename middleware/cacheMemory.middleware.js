const cache = {};
const CACHE_TTL_MS = 60 * 1000;

const productsCache = async (req, res, next) => {
  const currentUrl = req.originalUrl;
  const cachedRecord = cache[currentUrl];

  if (req.method !== "GET") {
    Object.keys(cache).forEach((key) => {
      if (cache[key] && key.startsWith("/products")) {
        delete cache[key];
      }
    });
    return next();
  }

  if (cachedRecord && Date.now() <= cachedRecord.expiresAt) {
    res.set("cache", "HIT");
    return res.json(cachedRecord.data);
  }

  if (cachedRecord && Date.now() > cachedRecord.expiresAt) {
    delete cache[currentUrl];
  }

  res.set("cache", "MISS");

  const originalJson = res.json.bind(res);
  res.json = (responseData) => {
    cache[currentUrl] = {
      data: responseData,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };
    return originalJson(responseData);
  };

  next();
};

module.exports = {
  productsCache,
};
