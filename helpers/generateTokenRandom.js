const crypto = require("crypto");
module.exports = () => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};