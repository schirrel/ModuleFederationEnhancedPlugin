# getOrLoadRemote

load and registre a remote if it isn't, and get a Remote

The author is @ScriptedAlchemy at its gist: https://gist.github.com/ScriptedAlchemy/3a24008ef60adc47fad1af7d3299a063

## Usage

```js
 * @param {string} remote - the remote global name
 * @param {object | string} shareScope - the shareScope Object OR scope key (usually is 'default')
 * @param {string} remoteFallbackUrl - fallback url for remote module
 * @returns {Promise<object>} - Federated Module Container
 */
await getOrLoadRemote('myApp', sharedScope, "myApp.co.uk/remoteEntry.js");

```
