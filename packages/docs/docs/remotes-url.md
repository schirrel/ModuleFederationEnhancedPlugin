# Remotes' URL 

## Remotes' URL List

> list of all remotes available for consumption

```js
const ModuleFederationEnhacedPlugin = require("@schirrel/module-federation-enhanced-plugin");
module.export = {
  //... rest of your config
  plugins: [
    new ModuleFederationEnhancedPlugin({
      name: "myMainModule",
      // same as the ModuleFederationPlugin config
      remotes: {
        app1: "app1@myApp1.com/remoteEntry.js",
        app2: "app2@coolAppRunningOnCloud.com.br/remoteEntry.js",
      },
    }),
  ],
};
```

This will export a list with as:

```json
[
  { "app1": "myApp1.com/remoteEntry.js" },
  { "app2": "coolAppRunningOnCLoude.com.br/remoteEntry.js" }
]
```

And it will be expose this as a low level API:

```js
const moduleUrlListFactory = await window.myMainModule.get("./remoteUrlList");
const moduleList = moduleUrlListFactory();
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
import moduleList from "myRemotemModule/remoteUrlList";
```

---


## Remotes' URL Map

> object Map of all remotes available for consumption

```js
const ModuleFederationEnhacedPlugin = require("@schirrel/module-federation-enhanced-plugin");
module.export = {
  //... rest of your config
  plugins: [
    new ModuleFederationEnhancedPlugin({
      name: "myMainModule",
      // same as the ModuleFederationPlugin config
      remotes: {
        app1: "app1@myApp1.com/remoteEntry.js",
        app2: "app2@coolAppRunningOnCloud.com.br/remoteEntry.js",
      },
    }),
  ],
};
```

This will export a list with

```json
{
  "app1": "myApp1.com/remoteEntry.js",
  "app2": "coolAppRunningOnCLoude.com.br/remoteEntry.js"
}
```

And it will be expose this as a low level API:

```js
const moduleUrlMapFactory = await window.myMainModule.get("./remoteUrlMap");
const remoteNameList = moduleUrlMapFactory();
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
import remoteNameList from "myRemotemModule/remoteUrlMap";
```

---
