const router = require('express').Router();
const { asyncMiddleWare } = require('../Delegates/AsyncMiddleware');
const checkCompany = require('../Delegates/CheckCompany');
const httpStatusCode = require('../Constants/HttpStatusCode');
const Company = require('../Models/Company');
const { generateRandomUniqNumber } = require('../Utils/GenerateRandomNumber');
const responseMessageConstants = require('../Constants/responseMessageConstants');
router.post(
  '/saveCompany',
  asyncMiddleWare(async (req, res) => {
    const [companyDetails] = await checkCompany(req.body.domainName);
    if (!companyDetails.length) {
      req.body.companyId = generateRandomUniqNumber();
      const company = new Company(req.body);
      const [saveCompany] = await company.saveCompanyDetails();
      if (saveCompany) {
        res.status(httpStatusCode.SUCCESS).json({ companyId: req.body.companyId, companyName: req.body.companyName });
      } else {
        throw Error(responseMessageConstants.SERVER_ERROR);
      }
    } else {
      res.status(httpStatusCode.SUCCESS).json({ companyId: companyDetails[0].companyId, companyName: companyDetails[0].companyName });
    }
  })
);
module.exports = router;
