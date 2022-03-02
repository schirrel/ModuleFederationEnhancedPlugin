# extended-module-federation-plugin

Utility to extend Module Federation power.

It uses inheritance so it receive the same props of ModuleFederationPlugin and call it under the hoods.

# Install

```shell script
yarn install.../extended-module-federation-plugin -D
```

# Extended

### Extended to remoteEntry:
|   Prop    |                   Description                       |
| --------- | --------------------------------------------------- |
| moduleMap | list of all available modules from a single remote. |
| remoteMap | list of all modules available for consumption       |

### Other

|   Prop    |                   Description                       |
| --------- | --------------------------------------------------- |
| chunkMap.json | list of all chunkNames and create a json file on dist filder. |
# Usage

```js
const ExtendedModuleFederationPlugin = require("@module-federation/extended-module-federation-plugin");

module.export = {
  //... rest of your config
  plugins: [
    new ExtendedModuleFederationPlugin({
      name: "myApp",
      library: { type: "var", name: "app2" },
      filename: "remoteEntry.js",
      remotes: {
        app1: "app1",
        app2: "app2",
      },
      exposes: {
        Button: "./src/Button",
        Input: "./src/Input",
        /* Auto Generated:
            moduleMap: ['Button', 'Input']
            remoteMap: ['app1', 'app2']
          */
      },
    }),
  ],
};
```

Usage on component:

```js
import moduleMap from "myApp/moduleMap";
import remoteMap from "myApp/remoteMap";
```
