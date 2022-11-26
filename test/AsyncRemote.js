const test = require("ava");
const mocks = require("./mocks");
const AsyncRemote = require("../src/AsyncRemote");

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
