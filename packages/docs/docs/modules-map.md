
## Modules' Name Map
> list of all available modules from a single remote. 
 
```js
const ModuleFederationEnhacedPlugin = require("@schirrel/module-federation-enhanced-plugin");
module.export = {
  //... rest of your config
  plugins: [
    new ModuleFederationEnhancedPlugin({
      name: 'myRemotemModule',
    // same as the ModuleFederationPlugin config
      exposes: {
        Button: "./src/Button",
        Input: "./src/Input"
      },
    }),
  ],
};
```
This will export a list with `['Button', 'Input']` for `myRemotemModule`, and when you use it on any other app you will be able to import `moduleNameMap`such as:

```js
import moduleNameMap from "myRemotemModule/moduleNameMap";
```
______________________________________________________
