const isVue = require("./utils/isVue");

const defaultOnError = () => {
  const module = {
    get: () => () => {},
    init: () => () => {},
  };
  resolve(module);
};

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
        script.onerror = ${
          remote.onError ? remote.onError.toString() : defaultOnError.toString()
        }
        document.head.appendChild(script);
      }`;
};

const handleAsyncRemote = (remote) => {
  return `promise new Promise(${dynamicRemote(remote).toString()})`;
};

const mountFinalRemoteValue = (remote) => {
  if (remote.async) {
    return handleAsyncRemote(remote);
  }
  return remote.name + "@" + remote.url;
};

const applyAsync = (remotes) => {
  const _newRemotes = {};
  Object.keys(remotes || {})?.forEach((remoteName) => {
    const remote = remotes[remoteName];
    _newRemotes[remoteName] =
      typeof remote === "string" ? remote : mountFinalRemoteValue(remote);
  });

  return _newRemotes;
};

const setAsyncConfig = (compiler) => {
  if (!isVue(compiler)) return compiler;

  if (!compiler.options.remotes) {
    if (compiler.options.optimization)
      compiler.options.optimization.splitChunks = false;
    else compiler.options.optimization = { splitChunks: false };
  } else {
    const { optimization } = compiler.options;
    if (optimization.splitChunk) {
      if (optimization.splitChunk.cacheGroups) {
        if (optimization.splitChunk.cacheGroups.common) {
          optimization.splitChunk.cacheGroups.common.chunks = "async";
        }
        if (optimization.splitChunk.cacheGroups.defaultVendors) {
          optimization.splitChunk.cacheGroups.defaultVendors.chunks = "async";
        }
      }
    }
  }

  return compiler;
};

module.exports = {
  applyAsync,
  setAsyncConfig,
};
