const jwt = require('jsonwebtoken');
const httpstatusCode = require('../Constants/HttpStatusCode');
const jwtConstants = require('../Constants/JwtConstants');

const generateJwt = (email, name) => {
  return jwt.sign({ id: email, name: name, date: Date.now() }, jwtConstants.JWT_KEY, {
    expiresIn: jwtConstants.EXPIRATION_TIME + 'm',
  });
};

const verifyJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(httpstatusCode.UNAUTHORIZED).json({ message: 'Token required' });
  }
  const decoded = jwt.verify(token.split('Bearer')[1], jwtConstants.JWT_KEY);
  if (decoded) {
    next();
  } else {
    res.status(httpstatusCode.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};
module.exports = { generateJwt, verifyJWT };
