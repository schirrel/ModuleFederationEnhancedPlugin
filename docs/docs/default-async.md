## Default async 

By default all remotes and modules will be converted to async using `promise new Promise` approach as in [Webpack docs](https://webpack.js.org/concepts/module-federation/).

In case you don't want all the remotes to be async by default, add the prop `defaultAsync` with `false`, as.
```javascript
new ModuleFederationEnhancedPlugin({
  defaultAsync: false
})
```

If any remote needed to be async among all other, you only need to add `async: true` to you remote declaration, as:
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
