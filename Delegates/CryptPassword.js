const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);
    return encryptPassword;
  } catch (error) {
    throw Error(error);
  }
};

const verifyPassword = async (encryptedPassword, userPassword) => {
  try {
    const verifyPassword = await bcrypt.compare(userPassword, encryptedPassword);
    return verifyPassword;
  } catch (error) {
    throw Error(error);
  }
};
module.exports = { encryptPassword, verifyPassword };
