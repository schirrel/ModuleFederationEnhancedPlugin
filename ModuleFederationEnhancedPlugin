const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

const dynamicRemote = (remote) => {
  return `(resolve) => {
        const script = document.createElement("script");
        script.src = "${remote.url}";
        script.onload = () => {
          const module = {
            get: (request) => window["${remote.name}"].get(request),
            init: (arg) => {
              try {
                return window["${remote.name}"].init(arg);
              } catch (e) {
                console.log("Problem loading remote ${remote.name}", e);
              }
            },
          };
          resolve(module);
        };
        script.onerror = () => {
          const module = {
            get: () => () => {},
            init: () => () => {},
          };
          resolve(module);
        };
        document.head.appendChild(script);
      }`;
};


const createAsyncPromise = (remote) => {
  return `promise new Promise(${dynamicRemote(remote).toString()})`;
};

const defaultAsync = (remotes) => {
  const _newRemotes = {};
  Object.keys(remotes)?.forEach((remoteName) => {
    const remote = remotes[remoteName].split("@");
    _newRemotes[remote[0]] =  createAsyncPromise({name: remote[0], url: remote[1]});
  });

  return _newRemotes;
};

class ModuleFederationEnhancedPlugin extends ModuleFederationPlugin {
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
        "./remoteUrlMap": `data:application/json,${JSON.stringify(
          Object.keys(options.remotes).map(remoteName => {
            return { [remoteName]: options.remotes[remoteName].split("@")[1] }
          })
        )}`,
      };
    }
    options.remotes = defaultAsync(options.remotes);
    super(options);
    this.options = options;
  }
}
module.exports = ModuleFederationEnhancedPlugin;
