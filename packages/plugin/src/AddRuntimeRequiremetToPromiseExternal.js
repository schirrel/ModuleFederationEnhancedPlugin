/*

Source: https://github.com/module-federation/module-federation-examples/blob/master/shared-routes2/app1/AddRuntimeRequiremetToPromiseExternal.js
all rights reserved to [@infoxicator](https://github.com/infoxicator)
*/

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
