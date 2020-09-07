const httpStatusCode = require('../Constants/HttpStatusCode');
const ErrorHandling = (error, req, res, next) => {
  res.status(httpStatusCode.SERVER_ERROR).json({ message: error.message });
};
module.exports = ErrorHandling;
