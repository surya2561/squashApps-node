const dbConn = require('../Utils/DBconnection');
const { UserQuery } = require('../Constants/SqlQuery');
const userQuery = UserQuery();

class User {
  constructor(user) {
    this.user = user;
  }
  saveUser() {
    if (this.user.firstName && this.user.lastName && this.user.companyId && this.user.password && this.user.userId) {
      return dbConn
        .execute(userQuery.SAVE_USER, [this.user.firstName, this.user.lastName, this.user.companyId, this.user.password, this.user.userId])
        .then((success) => {
          return success;
        })
        .catch((error) => {
          throw Error(error);
        });
    } else {
      throw Error('Invalid inputs');
    }
  }

  static checkEmail(email) {
    if (email) {
      return dbConn
        .execute(userQuery.CHECK_EMAIL, [email])
        .then((success) => {
          return success;
        })
        .catch((error) => {
          throw Error(error);
        });
    } else {
      throw Error('Invalid inputs');
    }
  }
  static signIn(body) {
    if (body.email && body.password) {
      return dbConn
        .execute(userQuery.SIGN_IN, [body.email, body.password])
        .then((success) => {
          return success;
        })
        .catch((error) => {
          throw Error(error);
        });
    } else {
      throw Error('Invalid inputs');
    }
  }
  static getAllEmail(companyId) {
    return dbConn
      .execute(userQuery.GET_ALL_EMAIL, [companyId])
      .then((success) => {
        return success;
      })
      .catch((error) => {
        throw Error(error);
      });
  }
  static getUser(userId, companyId) {
    return dbConn
      .execute(userQuery.GET_USER, [userId, companyId])
      .then((success) => {
        return success;
      })
      .catch((error) => {
        throw Error(error);
      });
  }
}
module.exports = User;
