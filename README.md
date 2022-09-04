# ModuleFederationEnhacedPlugin
Here are some functionalities for Webpack Module Federation.

##  Features
- Modules' Name Map
- Remotes' Name Map
- Remotes' URL Map
- Default async 



## Install
```sh
npm i @schirrel/module-federation-enhanced-plugin
```


## Modules' Name Map
> list of all available modules from a single remote. 
 
### Usage
#### Config
```js
const ModuleFederationEnhacedPlugin = require("@schirrel/module-federation-enhanced-plugin");
module.export = {
  //... rest of your config
  plugins: [
    new ModuleFederationEnhancedPlugin({
    // same as the ModuleFederationPlugin config
      exposes: {
        Button: "./src/Button",
        Input: "./src/Input"
      },
    }),
  ],
};
```
This will export a `moduleMap` with the value of `['Button', 'Input']`

#### File
```js
import moduleMap from "myApp/moduleMap";
```
______________________________________________________

## Remotes' Name Map
> list of all remotes available for consumption    
 
### Usage
#### Config
```js
const ModuleFederationEnhacedPlugin = require("@schirrel/ModuleFederationEnhancedPlugin");
module.export = {
  //... rest of your config
  plugins: [
    new ModuleFederationEnhancedPlugin({
    // same as the ModuleFederationPlugin config
        remotes: {
        app1: "app1@myApp1.com/remoteEntry.js",
        app2: "app2@coolAppRunningOnCloud.com.br/remoteEntry.js",
      },
    }),
  ],
};
```
This will export a `remoteMap` with the value of `['app1', 'app2']`

#### File
```js
import remoteMap from "myApp/remoteMap";
```

______________________________________________________

## Remotes' Name Map
>  list of all remotes URL for custom or lazy initilize    
 
### Usage
#### Config
```js
const ModuleFederationEnhancedPlugin = require("@schirrel/ModuleFederationEnhancedPlugin");
module.export = {
  //... rest of your config
  plugins: [
    new ModuleFederationEnhancedPlugin({
    // same as the ModuleFederationPlugin config
        remotes: {
        app1: "app1@myApp1.com/remoteEntry.js",
        app2: "app2@coolAppRunningOnCloud.com.br/remoteEntry.js",
      },
    }),
  ],
};
```
This will export a `remoteMap` with the value of `[{app1: 'myApp1.com/remoteEntry.js' app2: 'coolAppRunningOnCLoude.com.br/remoteEntry.js'}]`

#### File
```js
import remoteUrlMap from "myApp/remoteUrlMap";
```
## Object Remote
With this plugin you can create your remote as object, this helps the usage for remote names and url from `.env` values or a callback functions, for example.
```javascript

new ModuleFederationEnhancedPlugin({
   remotes: {
        app1: {
          name: "app1",
          url: "myApp1.com/remoteEntry.js"
        },
        app2: {
          name: process.env.app2NameByEnv,
          url: process.env.app2UrlByEnv
        },
        app3: {
          name: () => myVar.remoteName
          url:  () => myVar.remoteUrl
        }
      }
})
```
and this will convert to the string based.

## Default Async 
By default all remotes and modules will be threaten as async using `promise new Promise` approach as in [Webpack docs](https://webpack.js.org/concepts/module-federation/).
In case you don't want all the remotes to be async by default you can set the prop `defaultAsync` to false.
```javascript
new ModuleFederationEnhancedPlugin({
  defaultAsync: false
})
```
And if has any rmeote you wish to be async among all you remotes, you jas had to use Object Remote with `async: true`, as:
```javascript
new ModuleFederationEnhancedPlugin({
  defaultAsync: false,
  remotes: {
        app1: {
          name:"app1"
          url: 'myApp1.com/remoteEntry.js'
        },
        app2: {
          async: true,
          name: "app2",
          url: 'myApp2.com/remoteEntry.js'
        }
      }
})
````

# Disclaimer
The need of these functionalities is part of my Master Degree with Embrapa at UFMS, and so them must to be like are writen here.
Also some of these functionalities will be present or are being proposed to the oficial Enhanced module federation plugin.  
You can take a look at:
- https://github.com/schirrel/enhanced
- https://github.com/module-federation/enhanced/pull/2
