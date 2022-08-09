const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

const GenerateModuleMap = require("./src/GenerateModuleMap");
const GenerateRemoteMap = require("./src/GenerateRemoteMap");
const GenerateRemoteUrlMap = require("./src/GenerateRemoteUrlMap");
const AsyncRemote = require("./src/AsyncRemote");
class ModuleFederationEnhancedPlugin extends ModuleFederationPlugin {
  constructor(options) {
    if (!options.exposes) {
      options.exposes = {};
    }

    options.exposes = {
      ...options.exposes,
      ...GenerateModuleMap(options),
      ...GenerateRemoteMap(options),
      ...GenerateRemoteUrlMap(options),
    };

    options.remotes = AsyncRemote.applyAsync(options.remotes);

    super(options);
    this.options = options;
  }
  apply(compiler) {
    AsyncRemote.setAsyncConfig(compiler)
    super.apply(compiler);
  }
}
module.exports = ModuleFederationEnhancedPlugin;