function asyncMiddleWare(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  };
}

module.exports = { asyncMiddleWare };
