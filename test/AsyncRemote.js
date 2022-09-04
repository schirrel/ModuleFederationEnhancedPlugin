const test = require("ava");
const AsyncRemote = require("../src/AsyncRemote");
const mocks = require("./mocks");

test("setAsyncConfig must change splitChunks to false if is vue and has cacheGroups common", async (t) => {
  const result = AsyncRemote.setAsyncConfig({
    options: {
      module: { noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/ },
      remotes: mocks.remotes,
      optimization: {
        splitChunk: {
          cacheGroups: {
            common: {},
          },
        },
      },
    },
  });
  t.is(
    result.options.optimization.splitChunk.cacheGroups.common.chunks,
    "async"
  );
});

test("setAsyncConfig must change splitChunks to false if is vue and has defaultVendors common", async (t) => {
  const result = AsyncRemote.setAsyncConfig({
    options: {
      module: { noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/ },
      remotes: mocks.remotes,
      optimization: {
        splitChunk: {
          cacheGroups: {
            defaultVendors: {},
          },
        },
      },
    },
  });
  t.is(
    result.options.optimization.splitChunk.cacheGroups.defaultVendors.chunks,
    "async"
  );
});

test("setAsyncConfig must change splitChunks to false if is vue and has remotes", async (t) => {
  mocks.compiler.options.module.noParse =
    /^(vue|vue-router|vuex|vuex-router-sync)$/;

  let result = AsyncRemote.setAsyncConfig(mocks.compiler);
  t.deepEqual(result.options.optimization, { splitChunks: false });

  result = AsyncRemote.setAsyncConfig({
    ...mocks.compiler,
    remotes: mocks.remotes,
    optimization: {
      splitChunks: true,
    },
  });
  t.deepEqual(result.options.optimization, { splitChunks: false });

  result = AsyncRemote.setAsyncConfig({
    ...mocks.compiler,
    remotes: mocks.remotes,
  });
  t.deepEqual(result.options.optimization, { splitChunks: false });
});

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

test("Object remote with functions props must be converted", async (t) => {
  const result = AsyncRemote.applyAsync(mocks.remotes);
  t.is(result.functionObjectApp, mocks.functionObjectFinal);
});

test("All remotes must be converted into promise new Promise if second prop is true", async (t) => {
  const result = AsyncRemote.applyAsync(mocks.remotes, true);
  t.regex(result.app, /promise new Promise/gm);
  t.regex(result.wrongAsyncObjectApp, /promise new Promise/gm);
  t.regex(result.rightAsyncObjectApp, /promise new Promise/gm);
  t.regex(result.functionObjectApp, /promise new Promise/gm);
});

test("setAsyncConfig must not change a thing if is not vue", async (t) => {
  mocks.compiler;
  const result = AsyncRemote.setAsyncConfig(mocks.compiler);
  t.deepEqual(result, mocks.compiler);
});

test("setAsyncConfig must change splitChunks to false if is vue", async (t) => {
  mocks.compiler.options.module.noParse =
    /^(vue|vue-router|vuex|vuex-router-sync)$/;

  const result = AsyncRemote.setAsyncConfig(mocks.compiler);
  t.deepEqual(result.options.optimization, { splitChunks: false });
});
