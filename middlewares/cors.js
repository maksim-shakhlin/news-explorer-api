const cors = require('cors');
const { WHITELIST } = require('../configs/constants');

const options = {
  origin: (origin, callback) => {
    if (WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
};

module.exports.cors = cors(options);
