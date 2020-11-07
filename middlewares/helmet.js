const helmet = require('helmet');

const contentSecurityPolicyOptions = {
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'font-src': ["'self'"],
    'style-src': ["'self'"],
    'object-src': ["'none'"],
  },
};

module.exports.helmet = helmet({
  contentSecurityPolicy: contentSecurityPolicyOptions,
});
