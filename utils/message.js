const { DICTIONARY } = require('../configs/ru');

const plural = (forms, n) => {
  let idx;

  if (n % 10 === 1 && n % 100 !== 11) {
    idx = 0; // one
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    idx = 1; // few
  } else {
    idx = 2; // many
  }
  return forms[idx] || '';
};

module.exports.formMessage = (pattern, values) => {
  const words = pattern.split(' ').map((word) => {
    if (word[0] !== '%') {
      return word;
    }
    const w = word.substring(1);
    if (w.indexOf('-') !== -1) {
      const [value, form] = w.split('-');
      return plural(DICTIONARY[form], values[value]);
    }
    return values[w];
  });

  return words.filter((x) => [undefined, null, ''].indexOf(x) === -1).join(' ');
};
