/*

Source: https://github.com/module-federation/module-federation-examples/blob/master/shared-routes2/app1/AddRuntimeRequiremetToPromiseExternal.js 
Discussion: https://github.com/module-federation/module-federation-examples/pull/2173
all rights reserved to [@ScriptedAlchemy](https://github.com/ScriptedAlchemy) and [@infoxicator](https://github.com/infoxicator) 
*/

const pluginName = "ModuleFederationEnhancedPlugin";

const AddRuntimeRequiremetToPromiseExternal = (compiler) => {
  compiler.hooks.compilation.tap(pluginName, (compilation) => {
    const RuntimeGlobals = compiler.webpack.RuntimeGlobals;
    if (compilation.outputOptions.trustedTypes) {
      compilation.hooks.additionalModuleRuntimeRequirements.tap(
        pluginName,
        (module, set, context) => {
          if (module.externalType === "promise") {
            set.add(RuntimeGlobals.loadScript);
            set.add(RuntimeGlobals.require);
          }
        }
      );
    }
  });
};

module.exports = AddRuntimeRequiremetToPromiseExternal;
