const GenerateRemoteNameList = (options) => {
    if (options.remotes) {
      return {
        "./remoteNameList": `data:application/json,${JSON.stringify(
          Object.keys(options.remotes)
        )}`,
      };
    } else return {};
  };
  
  module.exports = GenerateRemoteNameList;