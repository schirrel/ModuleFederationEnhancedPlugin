# ModuleFederationEnhacedPlugin
Module Federation with a little bit more and all remotes async by default

Take a look at the full [docs](https://schirrel.dev/ModuleFederationEnhancedPlugin/)


Packages here:
- packages/plugin: 
   - docs: https://schirrel.dev/ModuleFederationEnhancedPlugin/
   - package: `@schirrel/module-federation-enhanced-plugin`
- packages/helper:
   - docs: https://schirrel.dev/ModuleFederationEnhancedPlugin/helper
   - package: `@schirrel/module-federation-enhanced-plugin-helper`



Dont want o read the docs? Here's a TL/DR:

## Features
- Modules' Name List
- Remotes' Name List
- Remotes' URL List and Map
- Remote definition with object
- Default async 


## Install
```sh
npm i @schirrel/module-federation-enhanced-plugin
```

## Config
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

# Disclaimer
The need of these functionalities is part of my Master Degree with Embrapa at UFMS, and so them must to be like are writen here.
Also some of these functionalities will be present or are being proposed to the oficial Enhanced module federation plugin.  
You can take a look at:
- https://github.com/schirrel/enhanced
- https://github.com/module-federation/enhanced/pull/2
