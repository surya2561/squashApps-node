const dbConn = require('../Utils/DBconnection');
const { CompanyQuery } = require('../Constants/SqlQuery');
const companyQuery = CompanyQuery();

class Company {
  constructor(companyDetails) {
    this.company = companyDetails;
  }
  saveCompanyDetails() {
    if (
      this.company.companyId &&
      this.company.companyName &&
      this.company.location &&
      this.company.employeesCount &&
      this.company.domainName
    ) {
      return dbConn
        .execute(companyQuery.SAVE_COMPANY, [
          this.company.companyId,
          this.company.companyName,
          this.company.location,
          this.company.employeesCount,
          this.company.domainName,
        ])
        .then((success) => {
          return success;
        })
        .catch((error) => {
          throw Error(error);
        });
    } else {
      throw Error('Invalid inputs');
    }
  }
  static checkCompany(companyId) {
    if (companyId) {
      return dbConn
        .execute(companyQuery.CHECK_COMPANY, [companyId])
        .then((success) => {
          return success;
        })
        .catch((error) => {
          throw Error(error);
        });
    } else {
      throw Error('Invalid inputs');
    }
  }

  static getCompany(domainName) {
    if (domainName) {
      return dbConn
        .execute(companyQuery.GET_COMPANY, [domainName])
        .then((success) => {
          return success;
        })
        .catch((error) => {
          throw Error(error);
        });
    } else {
      throw Error('Invalid inputs');
    }
  }
}
module.exports = Company;
