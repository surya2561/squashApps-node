const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const emailApiConstants = require('../constants/EmailApiConstants');

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: emailApiConstants.API_KEY,
    },
  })
);

const emailConfig = async (userEmail, subject, html) => {
  return transporter
    .sendMail({
      to: userEmail,
      from: emailApiConstants.SENDER_EMAIL,
      subject: subject,
      html: html,
    })
    .then((success) => {
      return success;
    })
    .catch((err) => {
      throw Error(err);
    });
};
module.exports = { emailConfig };
