const Company = require('../Models/Company');
const checkCompany = async (domainName) => {
  try {
    console.log(domainName);
    const [company] = await Company.getCompany(domainName);
    return [company];
  } catch (error) {
    throw Error(error);
  }
};
module.exports = checkCompany;
