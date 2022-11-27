# Remote definition with object

You can create your remote as object, this helps the usage for remote names and url from `.env` values or a callback functions, for example.

```javascript

new ModuleFederationEnhancedPlugin({
   remotes: {
        app1: {
          name: "app1",
          url: "myApp1.com"
        },
        app2: {
          name: process.env.app2NameByEnv,
          url: process.env.app2UrlByEnv
        },
        app3: {
          name: () => myVar.remoteName
          url:  () => myVar.remoteUrl
        },
         otherApp: {
          name: "otherApp",
          url: "coolSubdomain.myAwesomeRemotes.com/some-subdir"
        },
      }
})
```

## Properties

The properties for the object defition are:
| Property | Type | Default | Description |  
| -------- | ---- | --------| ----------- |
| name | `string` or `function` | | The name/scope of the remote, what comes before the `@` on the string based remote configuration |
| url | `string` or `function` | | The url of the js file for the remote, what comes after the `@` on the string based remote configuration. **It is extremely important to dont use the last slash(`/`) on the url** |
| remoteEntry |  `string` or `function` | `remoteEntry.js` | The name of the remoteEntry file you are using, if you use the default and large used `remoteEntry.js`, no need to fill this up  |
| async | `boolean` | true | The prop you can use to disabled the async behavior for a specific remote |

If you decide to disable the async behavios for any remote, no worries, the plugin will convert your object to string based configuration.
