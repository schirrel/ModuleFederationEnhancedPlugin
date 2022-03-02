const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
class ExtendedModuleFederationPlugin extends ModuleFederationPlugin {
  constructor(options) {
    if (!options.exposes) {
      options.exposes = {};
    }
    const exposedKeys = Object.keys(options.exposes);

    if (exposedKeys.length) {
      options.exposes = {
        ...options.exposes,
        "./moduleMap": `data:application/json,${JSON.stringify(exposedKeys)}`,
      };
    }

    if (options.remotes) {
      options.exposes = {
        ...options.exposes,
        "./remoteMap": `data:application/json,${JSON.stringify(
          Object.keys(options.remotes)
        )}`,
      };
    }

    super(options);
    this.options = options;
  }
  apply(compiler) {
    super.apply(compiler);
    compiler.hooks.emit.tapAsync(
      "ExtendedModuleFederationPlugin",
      (compilation, callback) => {
        console.log("Creating chunkMap\n");
        console.log(
          Array.from(compilation.chunks)
            .map((chunk) => {
              return Array.from(chunk.files);
            })
            .flat()
        );

        callback();
      }
    );
  }
}
module.exports = ExtendedModuleFederationPlugin;
