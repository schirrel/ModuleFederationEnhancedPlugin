const converter = require("./converter");

const validateRemoteType = (remoteName, options) => {
  const remote = options.remotes[remoteName];
  const objectRemote = converter.convertToFinalObject(remote);
  return typeof remote === "string"
    ? { [remoteName]: remote.split("@")[1] }
    : {
        [objectRemote.name]: `${objectRemote.url}/${objectRemote.remoteEntry}`,
      };
};

const generateRemotesList = (options) => {
  return Object.keys(options.remotes).map((remoteName) => {
    return validateRemoteType(remoteName, options);
  });
};

module.exports = {
  generateRemotesList,
};
