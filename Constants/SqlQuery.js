const OtpQuery = () => {
  const SAVE_OTP = 'INSERT INTO OTP(email, otpValue, expirationTime) VALUES (?,?,?)';
  const CHECK_OTP = 'SELECT * FROM OTP WHERE email = ? AND otpValue = ?';
  return { SAVE_OTP, CHECK_OTP };
};

const UserQuery = () => {
  const CHECK_EMAIL = 'SELECT * FROM USERS WHERE userId = ?';
  const SAVE_USER = 'INSERT INTO USERS(firstName, lastName, companyId, password, userId) VALUES (?,?,?,?,?)';
  const SIGN_IN = 'SELECT * FROM USERS WHERE userId = ? AND password = ?';
  const GET_ALL_EMAIL = 'SELECT userId FROM USERS WHERE companyId = ?';
  const GET_USER = 'SELECT * FROM USERS WHERE userId = ? AND companyId = ?';
  return { CHECK_EMAIL, SAVE_USER, SIGN_IN, GET_ALL_EMAIL, GET_USER };
};

const CompanyQuery = () => {
  const SAVE_COMPANY = 'INSERT INTO COMPANY(companyId, companyName, location, no_of_employees, domainName) VALUES (?,?,?,?,?)';
  const CHECK_COMPANY = 'SELECT * FROM COMPANY WHERE companyId = ?';
  const GET_COMPANY = 'SELECT * FROM COMPANY WHERE domainName = ?';
  return { SAVE_COMPANY, CHECK_COMPANY, GET_COMPANY };
};

const AnnouncementQuery = () => {
  const SAVE_ANNOUNCEMENT = `INSERT INTO ANNOUNCEMENT (announcementId, subject, category,
                                description, companyId, userId) VALUES (?,?,?,?,?,?)`;
  const GET_ANNOUNCEMENTS = `SELECT ANNOUNCEMENT.announcementId, subject, category, description, eventDate, eventTime, location,remainderDate, firstName, lastName, createdDate FROM ANNOUNCEMENT
                             LEFT JOIN EVENTS ON ANNOUNCEMENT.announcementId = EVENTS.announcementId
                             LEFT JOIN REMAINDER ON ANNOUNCEMENT.announcementId = REMAINDER.announcementId
                             LEFT JOIN NOTIFY ON ANNOUNCEMENT.announcementId = NOTIFY.announcementId
                             INNER JOIN USERS ON ANNOUNCEMENT.userId = USERS.userId WHERE USERS.companyId = ? AND FIND_IN_SET(?,NOTIFY.notify) > 0  OR NOTIFY.notify = 'ALL'`;

  return { SAVE_ANNOUNCEMENT, GET_ANNOUNCEMENTS };
};

const EventsQuery = () => {
  const SAVE_EVENTS = 'INSERT INTO EVENTS (eventDate, eventTime, location, announcementId) VALUES (?,?,?,?)';
  return { SAVE_EVENTS };
};

const ReminderQuery = () => {
  const SAVE_REMINDER = 'INSERT INTO REMAINDER (remainderDate, announcementId) VALUES (?,?)';
  return { SAVE_REMINDER };
};

const NotifyQuery = () => {
  const SAVE_NOTIFY = 'INSERT INTO NOTIFY (announcementId, notify) VALUES ?';
  return { SAVE_NOTIFY };
};

const CommentAnnouncement = () => {
  const SAVE_COMMENT = 'INSERT INTO COMMENTANNOUNCEMENT (announcementId, comment, userId, companyId) VALUES (?,?,?,?)';
  const GET_COMMENTS =
    'SELECT COMMENTANNOUNCEMENT.comment, COMMENTANNOUNCEMENT.createdDate, USERS.firstName FROM COMMENTANNOUNCEMENT INNER JOIN USERS ON COMMENTANNOUNCEMENT.userId = USERS.userId WHERE COMMENTANNOUNCEMENT.companyId = ? AND COMMENTANNOUNCEMENT.announcementId = ? ORDER BY COMMENTANNOUNCEMENT.createdDate DESC';
  return { SAVE_COMMENT, GET_COMMENTS };
};
module.exports = { OtpQuery, UserQuery, CompanyQuery, AnnouncementQuery, EventsQuery, ReminderQuery, NotifyQuery, CommentAnnouncement };
