const functionObject = {
  remoteName: "functionObjectApp",
  remoteUrl: "functionObjectApp.com/remoteEntry.js",
};
const remotes = {
  app: "app1@myApp1.com/remoteEntry.js",
  wrongAsyncObjectApp: {
    name: "wrongAsyncObjectApp",
    url: "wrongAsyncObjectApp.com/remoteEntry.js",
  },
  rightAsyncObjectApp: {
    async: true,
    name: "rightAsyncObjectApp",
    url: "rightAsyncObjectApp.com/remoteEntry.js",
  },
  functionObjectApp: {
    name: () => functionObject.remoteName,
    url: () => functionObject.remoteUrl,
  },
};

const exposes = {
  Button: "./src/Button",
  Input: "./src/Input",
};

module.exports = {
  remotes,
  exposes,
  functionObjectFinal: `${functionObject.remoteName}@${functionObject.remoteUrl}`,
};
