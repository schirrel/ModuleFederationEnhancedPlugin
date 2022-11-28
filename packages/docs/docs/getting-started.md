# Getting started

Once instaled is easy to use, you wont have to learn more than you already know to use the awesome `ModuleFederationPlugin`

## Config 
Import it on your `webpack.config` file, or `vue.config` if its your case:
```js
const ModuleFederationEnhancedPlugin = require("@schirrel/module-federation-enhanced-plugin");
```

Then you just need to replace the actual `ModuleFederationPlugin` usage with `ModuleFederationEnhancedPlugin`:

```js
const ModuleFederationEnhacedPlugin = require("@schirrel/module-federation-enhanced-plugin");
module.export = {
  //... rest of your config
  plugins: [
    new ModuleFederationEnhancedPlugin({
      // same as the ModuleFederationPlugin config
      exposes: {
        Button: "./src/Button",
        Input: "./src/Input",
      },
    }),
  ],
};
```

The plugin extends all behaviors from `ModuleFederationPlugin` and uses the same default configuration options, with some more we just add, but relax, the basic default `ModuleFederationPlugin` you already use will work perfectly.
