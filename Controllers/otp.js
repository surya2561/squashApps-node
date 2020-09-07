const router = require('express').Router();
const Otp = require('../Models/Otp');
const verifyEmail = require('../Delegates/VerifyEmail');
const { asyncMiddleWare } = require('../Delegates/AsyncMiddleware');
const { generateRandomUniqNumber } = require('../Utils/GenerateOtp');
const { emailConfig } = require('../Utils/SendingEmail');
const httpStatusCode = require('../Constants/HttpStatusCode');

router.post(
  '/sendOtp',
  asyncMiddleWare(async (req, res) => {
    console.log(req.body.email);
    const [user] = await verifyEmail.checkEmail(req.body.email);
    console.log(user);
    if (!user) {
      const randomNumber = generateRandomUniqNumber();
      const currentDate = new Date();
      const expirationTime = currentDate.setMinutes(currentDate.getMinutes() + 2);
      const otp = new Otp({ email: req.body.email, otpValue: randomNumber, expirationTime: expirationTime });
      const [saveOtp] = await otp.saveOtp();
      const subject = 'Otp for verifyingEmail';
      const html = `<div>Your OTP is ${randomNumber}</div>`;
      const sendingMail = await emailConfig(req.body.email, subject, html);
      if (saveOtp && sendingMail.message == 'success') {
        res.status(httpStatusCode.SUCCESS).json({ message: 'A otp Has been sent to a given mailid' });
      } else {
        throw Error('Something bad happend');
      }
    } else {
      res.status(httpStatusCode.SUCCESS).json({ message: 'Email already gets registered' });
    }
  })
);

router.post(
  '/verifyOtp',
  asyncMiddleWare(async (req, res) => {
    console.log(req.body);
    const [[checkOtp]] = await Otp.checkOtp(req.body);
    const currentDate = new Date();
    currentDate.setTime(parseInt(Date.now()));
    if (checkOtp && currentDate.toLocaleString() < checkOtp.expirationTime.toLocaleString()) {
      res.status(httpStatusCode.SUCCESS).json({ message: 'Otp verified' });
    } else {
      res.status(httpStatusCode.SUCCESS).json({ message: 'Invalid otp' });
    }
  })
);

module.exports = router;
