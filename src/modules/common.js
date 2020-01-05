const keys = require('../../config/keys');
const sha256 = require('sha256');

module.exports = {
  parse: msg => {
    return JSON.parse(JSON.stringify(msg));
  },
  time: () => {
    return Math.floor(new Date() / 1000);
  },
  hash: str => {
    return sha256(str + keys.secret);
  }
};
