const fs = require("fs/promises");
const path = require("path");

const DB_FILE_PATH = path.join(__dirname, "db.json");
const READ_DELAY_MS = 5000;

const readData = async () => {
  try {
    const rawData = await fs.readFile(DB_FILE_PATH, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    return { error: `found error on reading file ${err}` };
  }
};

const delayReadData = async () => {
  await new Promise((resolve) => setTimeout(resolve, READ_DELAY_MS));
  return await readData();
};

const writeIntoFile = async (data) => {
  return fs.writeFile(DB_FILE_PATH, JSON.stringify(data, null, 2));
};

module.exports = {
  delayReadData,
  writeIntoFile,
};
