# 2.0.0
- renamed `moduleMap` to `moduleNameList`
- renamed `remoteMap` to `remoteNameList`
- renamed old `remoteUrlMap` to `remoteUrlList`, once it was a list and not a map

- add new `remoteUrlMap` now a proper name object
- remove the need of the `remoteEntry.js` to be present on the Remote Object Definitions, with `remoteEntry.js` as default value
- add `remoteEntry` prop to the Remote Object Definitions in case its need to use a custom filename for remoteEntry