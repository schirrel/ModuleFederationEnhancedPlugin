const GenerateRemoteNameMap = (options) => {
    if (options.remotes) {
      return {
        "./remoteNameMap": `data:application/json,${JSON.stringify(
          Object.keys(options.remotes)
        )}`,
      };
    } else return {};
  };
  
  module.exports = GenerateRemoteNameMap;