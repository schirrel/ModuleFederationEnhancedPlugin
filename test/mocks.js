const functionObject = {
  remoteName: "functionObjectApp",
  remoteUrl: "functionObjectApp.com",
};
const remotes = {
  app: "app1@myApp1.com/remoteEntry.js",
  wrongAsyncObjectApp: {
    name: "wrongAsyncObjectApp",
    url: "wrongAsyncObjectApp.com",
  },
  rightAsyncObjectApp: {
    async: true,
    name: "rightAsyncObjectApp",
    url: "rightAsyncObjectApp.com",
  },
  functionObjectApp: {
    name: () => functionObject.remoteName,
    url: () => functionObject.remoteUrl,
  },
  objectCustomRemoteEntry: {
    async: false,
    name: "objectCustomRemoteEntry",
    url: "objectCustomRemoteEntry.com",
    remoteEntry: "customRemoteEntry.js",
  },
};

const exposes = {
  Button: "./src/Button",
  Input: "./src/Input",
};
const compiler = {
  options: {
    module: {},
  },
};

module.exports = {
  remotes,
  exposes,
  compiler,
  functionObjectFinal: `${functionObject.remoteName}@${functionObject.remoteUrl}/remoteEntry.js`,
  objectCustomRemoteEntry: `${remotes.objectCustomRemoteEntry.name}@${remotes.objectCustomRemoteEntry.url}/${remotes.objectCustomRemoteEntry.remoteEntry}`,
};
