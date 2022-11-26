const AsyncRemote = require("./AsyncRemote");
const converter = require("./utils/converter");

const handleAsyncRemote = (remote) => {
  return `promise new Promise(${AsyncRemote.dynamicRemote(remote).toString()})`;
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
  if (remote.async || defaultAsync) {
    // remote = validateAndSetDefault(remote);
    return handleAsyncRemote(remote);
  }
  return `${remote.name}@${remote.url}/${remote.remoteEntry}`;
};

const createAsyncRemote = (remote, defaultAsync) => {
  let remoteObject = converter.Remote(remote).isString()
    ? converter.convertStringToObject(remote)
    : remote;

  remoteObject = validateAndSetDefault(remoteObject);

  return mountFinalRemoteValue(remoteObject, defaultAsync);
};

const createNotAsyncRemote = (remote) => {
  return converter.Remote(remote).isString()
    ? remote
    : mountFinalRemoteValue(converter.convertToFinalObject(remote), false);
};

const handleRemotes = (remotes, defaultAsync) => {
  const _newRemotes = {};
  Object.keys(remotes || {})?.forEach((remoteName) => {
    const remote = remotes[remoteName];
    _newRemotes[remoteName] = defaultAsync || remote.true
      ? createAsyncRemote(remote)
      : createNotAsyncRemote(remote);
  });

  return _newRemotes;
};

module.exports = {
  handleRemotes,
};
