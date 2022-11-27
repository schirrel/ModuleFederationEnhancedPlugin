# Remotes' Name Map
> list of all remotes available for consumption    
 
```js
const ModuleFederationEnhacedPlugin = require("@schirrel/module-federation-enhanced-plugin");
module.export = {
  //... rest of your config
  plugins: [
    new ModuleFederationEnhancedPlugin({
      name: 'myMainModule',
    // same as the ModuleFederationPlugin config
      remotes: {
        app1: "app1@myApp1.com/remoteEntry.js",
        app2: "app2@coolAppRunningOnCloud.com.br/remoteEntry.js",
      },
    }),
  ],
};
```
This will export a list with `['app1', 'app2']`, it will expose this as a low level API:
```js
 const remoteNameMapFactory = await window.myMainModule.get('./remoteNameMap')
 const remoteNameMap = remoteNameMapFactory()
```

### With Import
to use with `import` your `myMainModule` must be in you remote entries, like:
```js
   remotes: {
        myMainModule: "myMainModule@myMainModule.com/remoteEntry.js",
        app1: "app1@myApp1.com/remoteEntry.js",
        app2: "app2@coolAppRunningOnCloud.com.br/remoteEntry.js",
      },
```

Them you will be able to perform:
```js
import remoteNameMap from "myRemotemModule/remoteNameMap";
```
______________________________________________________
