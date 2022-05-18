const crypto = require('crypto');

const tokenGenerator = (req, _res, next) => {
  const generatedToken = crypto.randomBytes(8).toString('hex');
  req.newToken = generatedToken;
  
  next();
};

module.exports = tokenGenerator;
