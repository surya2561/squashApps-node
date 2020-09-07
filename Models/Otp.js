const dbConn = require('../Utils/DBconnection');
const { OtpQuery } = require('../Constants/SqlQuery');
const otpQuery = OtpQuery();
class Otp {
  constructor(otp) {
    this.otp = otp;
  }
  saveOtp() {
    if (this.otp.email && this.otp.otpValue && this.otp.expirationTime) {
      return dbConn
        .execute(otpQuery.SAVE_OTP, [this.otp.email, this.otp.otpValue, new Date(this.otp.expirationTime)])
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

  static checkOtp(body) {
    if (body.email && body.otpValue) {
      return dbConn
        .execute(otpQuery.CHECK_OTP, [body.email, body.otpValue])
        .then((success) => {
          return success;
        })
        .catch((error) => {
          console.log(error);
          throw Error(error);
        });
    } else {
      throw Error('Invalid inputs');
    }
  }
}

module.exports = Otp;
