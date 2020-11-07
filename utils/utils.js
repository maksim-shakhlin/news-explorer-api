const find = (string, character, n = 1) => {
  let cnt = n;
  let ind = 0;

  while (cnt && ind !== -1) {
    ind = string.indexOf(character, ind + 1);
    cnt -= 1;
  }

  return ind;
};

module.exports.find = find;

module.exports.urlWithoutPath = (string) => {
  const ind = find(string, '/', 3);
  if (ind === -1) {
    return string;
  }
  return string.substring(0, ind);
};
