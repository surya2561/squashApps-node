const dbConn = require('../Utils/DBconnection');
const { NotifyQuery } = require('../Constants/SqlQuery');
const notifyQuery = NotifyQuery();
class Notify {
  constructor(notifyData) {
    this.notifyData = notifyData;
  }
  saveNotifyData() {
    return dbConn
      .query(notifyQuery.SAVE_NOTIFY, [this.notifyData])
      .then((success) => {
        return success;
      })
      .catch((error) => {
        throw Error(error);
      });
  }
}

module.exports = Notify;
