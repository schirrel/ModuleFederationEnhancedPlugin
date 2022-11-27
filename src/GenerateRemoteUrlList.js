const remoteList = require("./utils/remoteList");

const GenerateRemoteUrlList = (options) => {
  if (options.remotes) {
    return {
      "./remoteUrlList": `data:application/json,${JSON.stringify(
        remoteList.generateRemotesList(options)
      )}`,
    };
  } else return {};
};

module.exports = GenerateRemoteUrlList;
