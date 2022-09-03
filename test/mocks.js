const remotes = {
  app: "app1@myApp1.com/remoteEntry.js",
  wrongAsyncObjectApp: {
    name: "wrongAsyncObjectApp",
    url: "wrongAsyncObjectApp.com/remoteEntry.js"
  },
  rightAsyncObjectApp: {
    async: true,
    name: "rightAsyncObjectApp",
    url: "rightAsyncObjectApp.com/remoteEntry.js"
  }
};


module.exports = {
    remotes
}