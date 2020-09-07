const router = require('express').Router();
const { asyncMiddleWare } = require('../Delegates/AsyncMiddleware');
const checkCompany = require('../Delegates/CheckCompany');
const httpStatusCode = require('../Constants/HttpStatusCode');
const Company = require('../Models/Company');
const { generateRandomUniqNumber } = require('../Utils/GenerateOtp');

router.post(
  '/saveCompany',
  asyncMiddleWare(async (req, res) => {
    const [companyDetails] = await checkCompany(req.body.domainName);
    console.log(companyDetails);
    if (!companyDetails.length) {
      req.body.companyId = generateRandomUniqNumber();
      const company = new Company(req.body);
      const [saveCompany] = await company.saveCompanyDetails();
      if (saveCompany) {
        res.status(httpStatusCode.SUCCESS).json({ companyId: req.body.companyId, companyName: req.body.companyName });
      } else {
        throw Error('Something bad happend');
      }
    } else {
      console.log('sldhjlvkers');
      res.status(httpStatusCode.SUCCESS).json({ companyId: companyDetails[0].companyId, companyName: companyDetails[0].companyName });
    }
  })
);
module.exports = router;
