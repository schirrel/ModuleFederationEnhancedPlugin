const converter = require("./utils/converter");

const validateRemoteType = (remoteName, options) => {
  const remote = options.remotes[remoteName];
  const objectRemote = converter.convertToFinalObject(remote);
  return typeof remote === "string"
    ? { [remoteName]: remote.split("@")[1] }
    : { [objectRemote.name]: objectRemote.url };
};

const GenerateRemoteUrlMap = (options) => {
  if (options.remotes) {
    return {
      "./remoteUrlMap": `data:application/json,${JSON.stringify(
        Object.keys(options.remotes).map((remoteName) => {
          return validateRemoteType(remoteName, options);
        })
      )}`,
    };
  } else return {};
};

module.exports = GenerateRemoteUrlMap;
