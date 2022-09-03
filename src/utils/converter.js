const convertStringToObject = (remote) => {
  const parts = remote.split("@");

  return {
    name: parts[0],
    url: parts[1],
  };
};

module.exports = { convertStringToObject };
