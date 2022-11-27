const DefaultAsync = require("./DefaultAsync");
const converter = require("./utils/converter");

const handleDefaultAsync = (remote) => {
  return `promise new Promise(${DefaultAsync.dynamicRemote(remote).toString()})`;
};

const validateAndSetDefault = (remote) => {
  remote.remoteEntry =
    "remoteEntry" in remote
      ? remote.remoteEntry
      : converter.defaultValues.remoteEntry;

  remote.async =
    "async" in remote ? remote.async : converter.defaultValues.async;

  return remote;
};

const mountFinalRemoteValue = (remote, defaultAsync) => {
  if(!remote.name || !remote.url) {
    throw new Error("ModuleFederationEnhancedPlugin: `name` and `url` are required when define a remote on object format.")
  }
  if (remote.async || defaultAsync) {
    return handleDefaultAsync(remote);
  }
  return `${remote.name}@${remote.url}/${remote.remoteEntry}`;
};

const createDefaultAsync = (remote, defaultAsync) => {
  let remoteObject = converter.Remote(remote).isString()
    ? converter.convertStringToObject(remote)
    : remote;

  remoteObject = validateAndSetDefault(remoteObject);

  return mountFinalRemoteValue(remoteObject, defaultAsync);
};

const createNotDefaultAsync = (remote) => {
  return converter.Remote(remote).isString()
    ? remote
    : mountFinalRemoteValue(converter.convertToFinalObject(remote), false);
};

const handleRemotes = (remotes, defaultAsync) => {
  const _newRemotes = {};
  Object.keys(remotes || {})?.forEach((remoteName) => {
    const remote = remotes[remoteName];
    _newRemotes[remoteName] = defaultAsync || remote.async
      ? createDefaultAsync(remote)
      : createNotDefaultAsync(remote);
  });

  return _newRemotes;
};

module.exports = {
  handleRemotes,
};
