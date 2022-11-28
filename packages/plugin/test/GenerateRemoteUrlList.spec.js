const test = require("ava");
const GenerateRemoteUrlList = require("../src/GenerateRemoteUrlList");
const mocks = require("./mocks");

test("Generate array with Remote URL", async (t) => {
  const result = GenerateRemoteUrlList({ remotes: mocks.remotes });

  t.assert(result["./remoteUrlList"].indexOf(`data:application/json,[`) === 0);
});

test("Generated URL array must have same remotes keys", async (t) => {
  const result = GenerateRemoteUrlList({ remotes: mocks.remotes });
  const resultList = JSON.parse(
    result["./remoteUrlList"].replace("data:application/json,", "")
  );

  const remoteKeys = Object.keys(mocks.remotes);
  const resultKeys = Object.keys(Object.assign({}, ...resultList));

  t.deepEqual(resultKeys, remoteKeys);
});
