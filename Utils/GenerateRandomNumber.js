const generateRandomUniqNumber = () => {
  const alphaNumericString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lengthOfOTP = 6;
  let randomNumber = '';
  for (let i = lengthOfOTP; i > 0; --i) {
    randomNumber += alphaNumericString[Math.round(Math.random() * (alphaNumericString.length - 1))];
  }
  return randomNumber;
};

module.exports = { generateRandomUniqNumber };
