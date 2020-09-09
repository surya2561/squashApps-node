const httpStatusCode = require('../Constants/HttpStatusCode');
const responseMessageConstants = require('../Constants/responseMessageConstants');
const ErrorHandling = (error, req, res, next) => {
  if (error.message == responseMessageConstants.SERVER_ERROR) {
    res.status(httpStatusCode.SERVER_ERROR).json({ message: 'Some Error appeared please check the request data' });
  } else {
    res.status(httpStatusCode.NOTFOUND).json({ message: error.message });
  }
};
module.exports = ErrorHandling;
