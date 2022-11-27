# dynamicLoad

This function load all needed and available for consuption, step:

- Get `remoteUrlMap` to know remotes
- Dynamic register by calling `getModule` that calls `getOrLoadRemote`
- List all remotes available for consuption using `moduleNameList` for each remote
- Load all modules for each remote
- Return all modules the app-shell, root-remote.

The scenario where we built this uppon was a scenario where the app shell only have remotes that only exposes what it is needed here. In our screnario, we need to offline install a PWA and cache all features, include remotes.
As many of then where being used im some sort of "lazy chunk load", "manualy" deal with ensure all ealy registration was being a pain.

With `dynamicLoad` we ensure all files needs for remotes are laoded and cached.
