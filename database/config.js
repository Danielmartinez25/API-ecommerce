const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(process.env.DB_CONNECTION);
    const host = `${connection.host}:${connection.port}`
    console.log(`database connect in ${host}`);
  } catch (error) {
    console.log(`error in database ${error.message}`);
  }
};

module.exports = mongoDB
