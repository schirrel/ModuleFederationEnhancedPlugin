const defaultValues = {
  remoteEntry: "remoteEntry.js",
  async: true,
};

const Remote = (remote) => {
  return {
    isString: () => typeof remote === "string",
  };
};

const convertStringToObject = (remote) => {
  const parts = remote.split("@");
  const urlParts = parts[1].split("/");
  const remoteEntry = urlParts.pop();
  const url = urlParts.join("");

  return {
    name: parts[0],
    url,
    remoteEntry,
  };
};

const convertToFinalObject = (remote) => {
  const _remote = {};

  Object.keys(remote).forEach((key) => {
    _remote[key] =
      typeof remote[key] === "function" ? remote[key]() : remote[key];
  });

  if (!Remote(remote).isString())
    _remote.remoteEntry =
      "remoteEntry" in remote ? remote.remoteEntry : defaultValues.remoteEntry;

  return _remote;
};

module.exports = {
  Remote,
  convertStringToObject,
  convertToFinalObject,
  defaultValues,
};
