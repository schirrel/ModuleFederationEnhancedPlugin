const GenerateModuleNameMap = (options) => {
    const exposedKeys = Object.keys(options.exposes);
    if (exposedKeys.length) {
      return {
        "./moduleNameMap": `data:application/json,${JSON.stringify(exposedKeys)}`,
      };
    }
    return {};
  };
  
  module.exports = GenerateModuleNameMap;