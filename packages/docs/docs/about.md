# About

Module Federation is already an awesome mental model and development done by Zack, Marais and Webpack team. But it has its needs of being generic and some improvements and functionalitions are up to us for develop.

Here the main behavior this package tries to improve:

## Async by default
With ModuleFederationPlugin all aplications are loaded on the aplication startup, sure it is in its "_core_" a dependency, right?
But with the approach of use it to integrate other aplications, in case of one of the aplications is down for a moment, the whole shell app wont load 😔

Webpack docs bring to us the way to handle this on [Promise Based Dynamic Remotes](https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes) but this was become so repetitive on its needs that we encapsulated here and release for all you joy.

But relax, if you dont want to, you can disable for all the remotes as well as disable or enable for a single one.


## Object Remote
The strucure of defining a remote already fit its needs and in most case is what we need, right? But sometimes it start to be repetitive to add `remoteEntry.js` in all of remotes, also if we want to use a .env var or need to get the value based on a validation, a.k.a function, we need to do string concatenation. Not so pretty huh? 
Here we split the definition of the `name`, `url` and you just need to say the `.js` file name if its diffrent from `remoteEntry.js`. For example:
```js
{
    authRemote: {
          name: "auth",
          url: process.env.authUrl
    },
     dsRemote: {
        name: "ds",
        url: () =>  someValidation ? process.env.dsUrl : "http://mydefaultds.com",
        remoteEntry: "dsEntryVersion.js"  
    },
}
```
This will generate:
- `auth@authUrlFromEnv.com/remoteEntry.js`
- `ds@dsUrlAfteValidation/dsEntryVersion.js`


## Lists
As we increase the remotes we had and what they expose, we may need to use a dinamic load or even have some monitoring on each, for these we had implemented a bunch of list methods for you usage, they are:
- Listing of remotes names consumed in a remote
- List of modules exposed from a remote
- List of remotes names and urls of theirs (available as a object Map also).


Go ahead and enjoy. We hope this plugin help you as much as it had help us.