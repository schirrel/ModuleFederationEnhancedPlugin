const convertStringToObject = (remote) => {
  const parts = remote.split("@");

  return {
    name: parts[0],
    url: parts[1],
  };
};

const convertToFinalObject = (remote) => {
  const _remote = {};

  Object.keys(remote).forEach((key) => {
    _remote[key] =
      typeof remote[key] === "function" ? remote[key]() : remote[key];
  });

  return _remote;
};

module.exports = { convertStringToObject, convertToFinalObject };
