const test = require("ava");
const GenerateRemoteUrlMap = require("../src/GenerateRemoteUrlMap");
const mocks = require("./mocks");

test("Generate Object with Remote URL", async (t) => {
  const result = GenerateRemoteUrlMap({ remotes: mocks.remotes });

  t.assert(result["./remoteUrlMap"].indexOf(`data:application/json,{`) === 0);
});

test("Generated URL array must have same remotes keys", async (t) => {
  const result = GenerateRemoteUrlMap({ remotes: mocks.remotes });
  const resultMap = JSON.parse(
    result["./remoteUrlMap"].replace("data:application/json,", "")
  );

  const remoteKeys = Object.keys(mocks.remotes);
  const resultKeys = Object.keys(Object.assign({}, resultMap));

  t.deepEqual(resultKeys, remoteKeys);
});
