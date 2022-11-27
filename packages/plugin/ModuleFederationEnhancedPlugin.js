const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

const GenerateModuleNameList = require("./src/GenerateModuleNameList");
const GenerateRemoteNameList = require("./src/GenerateRemoteNameList");
const GenerateRemoteUrlList = require("./src/GenerateRemoteUrlList");
const GenerateRemoteUrlMap = require("./src/GenerateRemoteUrlMap");
const AddRuntimeRequiremetToPromiseExternal = require("./src/AddRuntimeRequiremetToPromiseExternal");
const DefaultAsync = require("./src/DefaultAsync");
const ObjectRemote = require("./src/ObjectRemote");

class ModuleFederationEnhancedPlugin extends ModuleFederationPlugin {
  constructor(options) {
    if (!options.exposes) {
      options.exposes = {};
    }

    options.exposes = {
      ...options.exposes,
      ...GenerateModuleNameList(options),
      ...GenerateRemoteNameList(options),
      ...GenerateRemoteUrlList(options),
      ...GenerateRemoteUrlMap(options),
    };
    options.remotes = ObjectRemote.handleRemotes(
      options.remotes,
      options.defaultAsync ?? true
    );

    super(options);
    this.options = options;
  }
  apply(compiler) {
    DefaultAsync.setAsyncConfig(compiler);
    AddRuntimeRequiremetToPromiseExternal(compiler);
    super.apply(compiler);
  }
}
module.exports = ModuleFederationEnhancedPlugin;
