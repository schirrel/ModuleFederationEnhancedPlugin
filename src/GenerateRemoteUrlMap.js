const remoteList = require("./utils/remoteList");

const GenerateRemoteUrlMap = (options) => {
  if (options.remotes) {
    return {
      "./remoteUrlMap": `data:application/json,${JSON.stringify(
        remoteList
          .generateRemotesList(options)
          .reduce((obj, item) => Object.assign(obj, { ...item }), {})
      )}`,
    };
  } else return {};
};

module.exports = GenerateRemoteUrlMap;
