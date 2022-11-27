const GenerateModuleNameList = (options) => {
    const exposedKeys = Object.keys(options.exposes);
    if (exposedKeys.length) {
      return {
        "./remoteNameList": `data:application/json,${JSON.stringify(exposedKeys)}`,
      };
    }
    return {};
  };
  
  module.exports = GenerateModuleNameList;