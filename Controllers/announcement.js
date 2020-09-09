const router = require('express').Router();
const { asyncMiddleWare } = require('../Delegates/AsyncMiddleware');
const { generateRandomUniqNumber } = require('../Utils/GenerateRandomNumber');
const Announcement = require('../Models/Announcement');
const Event = require('../Models/Events');
const Reminder = require('../Models/Reminder');
const Notify = require('../Models/Notify');
const User = require('../Models/Users');
const Comment = require('../Models/CommentAnnouncement');
const httpstatusCode = require('../Constants/HttpStatusCode');
const { emailConfig } = require('../Utils/SendingEmail');
const jwtToken = require('../Delegates/JwtToken');
const responseMessageConstants = require('../Constants/responseMessageConstants');
router.post(
  '/saveAnnouncement',
  [jwtToken.verifyJWT],
  asyncMiddleWare(async (req, res) => {
    req.body.announcementId = generateRandomUniqNumber();
    const announcement = new Announcement(req.body);
    const [saveAnnouncement] = await announcement.saveAnnouncement();
    const [[getUser]] = await User.getUser(req.body.userId, req.body.companyId);
    if (saveAnnouncement) {
      if (String(req.body.category).toLocaleLowerCase() == 'events') {
        const event = new Event({
          date: req.body.date,
          time: req.body.time,
          location: req.body.location,
          announcementId: req.body.announcementId,
        });
        const [saveEvents] = await event.saveEvents();
        if (!saveEvents) {
          throw Error(responseMessageConstants.SERVER_ERROR);
        }
      } else if (String(req.body.category).toLocaleLowerCase() == 'reminder') {
        const reminder = new Reminder({ date: req.body.date, announcementId: req.body.announcementId });
        const [saveReminder] = await reminder.saveReminder();
        if (!saveReminder) {
          throw Error(responseMessageConstants.SERVER_ERROR);
        }
      }
      const subject = 'Announcement';
      const html = `<div>Announcement for ${req.body.subject} created by ${getUser.firstName + ' ' + getUser.lastName}</div>`;
      let email = '';
      if (req.body.notify == 'To All Members') {
        const [allEmail] = await User.getAllEmail(req.body.companyId);
        for (value of allEmail) {
          email += value.userId;
          email += ',';
        }
        const notify = new Notify([[req.body.announcementId, 'all']]);
        const saveNotify = await notify.saveNotifyData();
      } else {
        email = req.body.notify;
        let notifyArray = [];
        for (value of String(email).split(',')) {
          notifyArray.push([req.body.announcementId, value]);
        }
        const notify = new Notify(notifyArray);
        const saveNotify = await notify.saveNotifyData();
      }
      const sendingMail = await emailConfig(email, subject, html);
      if (sendingMail.message == 'success') {
        res.status(httpstatusCode.SUCCESS).json({ message: 'Announcement Saved and notified to members' });
      } else {
        throw Error(responseMessageConstants.SERVER_ERROR);
      }
    } else {
      throw Error(responseMessageConstants.SERVER_ERROR);
    }
  })
);

router.post(
  '/getAnnouncements',
  [jwtToken.verifyJWT],
  asyncMiddleWare(async (req, res) => {
    const [getAnnouncements] = await Announcement.getAnnouncements(req.body.companyId, req.body.userEmail);
    if (getAnnouncements) {
      res.status(httpstatusCode.SUCCESS).json({ announcementData: getAnnouncements });
    } else {
      throw Error(responseMessageConstants.SERVER_ERROR);
    }
  })
);

router.post(
  '/saveComments',
  [jwtToken.verifyJWT],
  asyncMiddleWare(async (req, res) => {
    const comment = new Comment(req.body);
    const [saveComment] = await comment.saveComment();
    if (saveComment) {
      res.status(httpstatusCode.SUCCESS).json({ message: 'Comments saved' });
    } else {
      throw Error(responseMessageConstants.SERVER_ERROR);
    }
  })
);

router.post(
  '/getComments',
  [jwtToken.verifyJWT],
  asyncMiddleWare(async (req, res) => {
    const [getComments] = await Comment.getComments(req.body.companyId, req.body.announcementId);
    if (getComments) {
      res.status(httpstatusCode.SUCCESS).json({ comments: getComments });
    } else {
      throw Error(responseMessageConstants.SERVER_ERROR);
    }
  })
);
module.exports = router;
