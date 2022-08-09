const defaultOnError = () => {
  const module = {
    get: () => () => { },
    init: () => () => { },
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
        script.onerror = ${remote.onError ? remote.onError.toString() : defaultOnError.toString()
    }
        document.head.appendChild(script);
      }`;
};

const handleAsyncRemote = (remote) => {
  return `promise new Promise(${dynamicRemote(remote).toString()})`;
};

const AsyncRemote = (remotes) => {
  const _newRemotes = {};
  Object.keys(remotes || {})?.forEach((remoteName) => {
    const remote = typeof remotes[remoteName] === "string" ? remotes[remoteName].split("@") : [remotes[remoteName].name, remotes[remoteName].url]

    _newRemotes[remoteName] = handleAsyncRemote({ name: remote[0], url: remote[1] });

  });

  return _newRemotes;
};

module.exports = AsyncRemote;