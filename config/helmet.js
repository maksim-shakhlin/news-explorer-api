const helmet = require('helmet');

const helmetOptions = {
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'font-src': ["'self'"],
    'style-src': ["'self'"],
    'object-src': ["'none'"],
  },
};

module.exports = helmet.contentSecurityPolicy(helmetOptions);
