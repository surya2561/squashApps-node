const Users = require('../Models/Users');
const checkEmail = async (email) => {
  try {
    const [user] = await Users.checkEmail(email);
    return user;
  } catch (error) {
    return new Error(error);
  }
};
module.exports = { checkEmail };
