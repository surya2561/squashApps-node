const router = require('express').Router();
const { asyncMiddleWare } = require('../Delegates/AsyncMiddleware');
const { encryptPassword, verifyPassword } = require('../Delegates/CryptPassword');
const User = require('../Models/Users');
const httpstatusCode = require('../Constants/HttpStatusCode');
const verifyEmail = require('../Delegates/VerifyEmail');
const jwtToken = require('../Delegates/JwtToken');
const { generateRandomUniqNumber } = require('../Utils/GenerateOtp');

router.post(
  '/signUp',
  asyncMiddleWare(async (req, res) => {
    req.body.password = await encryptPassword(req.body.password);
    req.body.userId = generateRandomUniqNumber();
    const user = new User(req.body);
    const [saveUser] = await user.saveUser();
    if (saveUser) {
      res.status(httpstatusCode.SUCCESS).json({ message: 'User saved successfully' });
    } else {
      throw Error('Something bad happend');
    }
  })
);

router.post(
  '/signin',
  asyncMiddleWare(async (req, res) => {
    const [user] = await verifyEmail.checkEmail(req.body.email);
    const response = {};
    if (user) {
      const passwordVerify = await verifyPassword(user.password, req.body.password);
      if (passwordVerify) {
        const token = jwtToken.generateJwt(req.body.email, req.body.firstName);
        response.firstName = user.firstName;
        response.lastName = user.lastName;
        response.companyId = user.companyId;
        response.userId = user.userId;
        response.userEmail = req.body.email;
        response.token = token;
        res.status(httpstatusCode.SUCCESS).json({ userData: response });
      } else {
        res.status(httpstatusCode.SUCCESS).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(httpstatusCode.SUCCESS).json({ message: 'Email not registered' });
    }
  })
);

module.exports = router;
