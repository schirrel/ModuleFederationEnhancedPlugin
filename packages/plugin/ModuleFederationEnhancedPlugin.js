const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

const GenerateModuleNameMap = require("./src/GenerateModuleNameMap");
const GenerateRemoteNameMap = require("./src/GenerateRemoteNameMap");
const GenerateRemoteUrlList = require("./src/GenerateRemoteUrlList");
const GenerateRemoteUrlMap = require("./src/GenerateRemoteUrlMap");
const DefaultAsync = require("./src/DefaultAsync");
const ObjectRemote = require("./src/ObjectRemote");

class ModuleFederationEnhancedPlugin extends ModuleFederationPlugin {
  constructor(options) {
    if (!options.exposes) {
      options.exposes = {};
    }

    options.exposes = {
      ...options.exposes,
      ...GenerateModuleNameMap(options),
      ...GenerateRemoteNameMap(options),
      ...GenerateRemoteUrlList(options),
      ...GenerateRemoteUrlMap(options),
    };
    options.remotes = ObjectRemote.handleRemotes(options.remotes,  options.defaultAsync ?? true);

    super(options);
    this.options = options;
  }
  apply(compiler) {
    DefaultAsync.setAsyncConfig(compiler)
    super.apply(compiler);
  }
}
module.exports = ModuleFederationEnhancedPlugin;