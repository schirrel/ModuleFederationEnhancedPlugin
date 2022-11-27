# 2.0.0
 Restructured the repository and the plugin
 - create packages
   - plugin: for the Webpack plugin
   - helper: for helpers on dynamic load
   - docs: create a better docs for the plugin


## @schirrel/module-federation-enhanced-plugin
### break changes
- renamed `moduleMap` to `moduleNameList`
- renamed `remoteMap` to `remoteNameList`
- renamed old `remoteUrlMap` to `remoteUrlList`, once it was a list and not a map

- add new `remoteUrlMap` now a proper name object
- remove the need of the `remoteEntry.js` to be present on the Remote Object Definitions, with `remoteEntry.js` as default value


### New features
- add `remoteEntry` prop to the Remote Object Definitions in case its need to use a custom filename for remoteEntry

### Improvements
- Aside with default async to handle one down application, we incorpored the AddRuntimeRequiremetToPromiseExternal rewriting the webpack requirements on its compiler to dont break the whole app when one remote is down.

## @schirrel/module-federation-enhanced-plugin

Create helper 