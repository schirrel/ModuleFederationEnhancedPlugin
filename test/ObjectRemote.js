const test = require("ava");
const mocks = require("./mocks");
const ObjectRemote = require("../src/ObjectRemote");

test("String remote string must be inaltered", async (t) => {
  const result = ObjectRemote.handleRemotes(mocks.remotes);
  t.is(result.app, mocks.remotes.app);
});

test("Object remote without async:true must be converted into string remote", async (t) => {
  const result = ObjectRemote.handleRemotes(mocks.remotes);

  t.is(
    result.wrongAsyncObjectApp,
    `${mocks.remotes.wrongAsyncObjectApp.name}@${mocks.remotes.wrongAsyncObjectApp.url}/remoteEntry.js`
  );
});

test("Object remote with async: true must be converted into promise new Promise", async (t) => {
  const result = ObjectRemote.handleRemotes(mocks.remotes);
  t.regex(result.rightAsyncObjectApp, /promise new Promise/gm);
});

test("Object remote with functions props must be converted", async (t) => {
  const result = ObjectRemote.handleRemotes(mocks.remotes);
  t.is(result.functionObjectApp, mocks.functionObjectFinal);
});

test("All remotes must be converted into promise new Promise if second prop is true", async (t) => {
  const result = ObjectRemote.handleRemotes(mocks.remotes, true);
  t.regex(result.app, /promise new Promise/gm);
  t.regex(result.wrongAsyncObjectApp, /promise new Promise/gm);
  t.regex(result.rightAsyncObjectApp, /promise new Promise/gm);
  t.regex(result.functionObjectApp, /promise new Promise/gm);
  const regex = new RegExp(
    String.raw`script.src = "${mocks.remotes.objectCustomRemoteEntryAsync.url}/${mocks.remotes.objectCustomRemoteEntryAsync.remoteEntry}"`,
    "g"
  );
  t.regex(result.objectCustomRemoteEntryAsync, regex);
});

test("Object remote with custom remoteEntry props must be converted", async (t) => {
  const result = ObjectRemote.handleRemotes(mocks.remotes);
  t.is(result.objectCustomRemoteEntry, mocks.objectCustomRemoteEntry);
  t.is(result.objectCustomRemoteEntryAsync, mocks.objectCustomRemoteEntryAsync);
});
