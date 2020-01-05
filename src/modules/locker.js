var jwt = require('jsonwebtoken');
const common = require('./common');
const { secret } = require('../../config/keys');
const { encrypt, decrypt } = require('./cypher');

let data = {
  unlock: (request, response, next) => {
    let authHeader = request.headers['authorization'] || '';
    if (typeof authHeader !== 'undefined' && authHeader.includes('Bearer ')) {
      authHeader = decrypt(authHeader.substring(7));
      jwt.verify(authHeader, secret, (err, decode) => {
        try {
          if (err) throw authHeader;
          // Here is authentication check from db & then...
          request.user = decode;
          next();
        } catch (error) {
          response.reply({ statusCode: 401 });
        }
      });
    } else {
      response.reply({ statusCode: 401 });
    }
  },
  lock: obj => {
    obj['iat'] = common.time();
    // obj["exp"] = common.time() + 60 * 60 * 24;
    obj['token'] = encrypt(jwt.sign(obj, secret));
    return obj;
  }
};

module.exports = data;
