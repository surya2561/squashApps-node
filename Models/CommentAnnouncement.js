const dbConn = require('../Utils/DBconnection');
const { CommentAnnouncement } = require('../Constants/SqlQuery');
const commentAnnouncement = CommentAnnouncement();

class Comment {
  constructor(commentData) {
    this.commentData = commentData;
  }
  saveComment() {
    return dbConn
      .execute(commentAnnouncement.SAVE_COMMENT, [
        this.commentData.announcementId,
        this.commentData.comment,
        this.commentData.userId,
        this.commentData.companyId,
      ])
      .then((success) => {
        return success;
      })
      .catch((error) => {
        throw Error(error);
      });
  }
  static getComments(companyId, announcementId) {
    return dbConn
      .execute(commentAnnouncement.GET_COMMENTS, [companyId, announcementId])
      .then((success) => {
        return success;
      })
      .catch((error) => {
        throw Error(error);
      });
  }
}
module.exports = Comment;
