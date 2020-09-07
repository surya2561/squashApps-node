const dbConn = require('../Utils/DBconnection');
const { AnnouncementQuery } = require('../Constants/SqlQuery');
const announcementQuery = AnnouncementQuery();
class Announcement {
  constructor(announcement) {
    this.announcement = announcement;
  }
  saveAnnouncement() {
    return dbConn
      .execute(announcementQuery.SAVE_ANNOUNCEMENT, [
        this.announcement.announcementId,
        this.announcement.subject,
        this.announcement.category,
        this.announcement.description,
        this.announcement.companyId,
        this.announcement.userId,
      ])
      .then((success) => {
        return success;
      })
      .catch((error) => {
        console.log(error);
        throw Error(error);
      });
  }
  static getAnnouncements(companyId, userEmail) {
    return dbConn
      .execute(announcementQuery.GET_ANNOUNCEMENTS, [companyId, userEmail])
      .then((success) => {
        return success;
      })
      .catch((error) => {
        throw Error(error);
      });
  }
}

module.exports = Announcement;
