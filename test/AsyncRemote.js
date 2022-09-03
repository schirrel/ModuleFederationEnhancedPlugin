const test = require("ava");
const AsyncRemote = require("../src/AsyncRemote");
const mocks = require("./mocks");

test("String remote string must be inaltered", async (t) => {
  const result = AsyncRemote.applyAsync(mocks.remotes);
  t.is(result.app, mocks.remotes.app);
});

test("Object remote without async:true must be converted into string remote", async (t) => {
  const result = AsyncRemote.applyAsync(mocks.remotes);

  t.is(
    result.wrongAsyncObjectApp,
    `${mocks.remotes.wrongAsyncObjectApp.name}@${mocks.remotes.wrongAsyncObjectApp.url}`
  );
});

test("Object remote with async: true must be converted into promise new Promise", async (t) => {
	const result = AsyncRemote.applyAsync(mocks.remotes);
	t.regex(result.rightAsyncObjectApp, /promise new Promise/gm);
  });


  test("All remotes must be converted into promise new Promise if second prop is true", async (t) => {
	const result = AsyncRemote.applyAsync(mocks.remotes, true);
	t.regex(result.app, /promise new Promise/gm);
	t.regex(result.wrongAsyncObjectApp, /promise new Promise/gm);
	t.regex(result.rightAsyncObjectApp, /promise new Promise/gm);

  });

