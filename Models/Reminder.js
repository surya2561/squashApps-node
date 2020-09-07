const dbConn = require('../Utils/DBconnection');
const { ReminderQuery } = require('../Constants/SqlQuery');
const reminderQuery = ReminderQuery();

class Reminder {
  constructor(reminder) {
    this.reminder = reminder;
  }
  saveReminder() {
    return dbConn
      .execute(reminderQuery.SAVE_REMINDER, [this.reminder.date, this.reminder.announcementId])
      .then((success) => {
        return success;
      })
      .catch((error) => {
        throw Error(error);
      });
  }
}
module.exports = Reminder;
