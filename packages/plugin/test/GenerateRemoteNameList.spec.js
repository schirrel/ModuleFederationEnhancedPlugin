const test = require("ava");
const GenerateRemoteNameList = require("../src/GenerateRemoteNameList");
const mocks = require("./mocks");

test("Generate array with Remote names", async (t) => {
  const result = GenerateRemoteNameList({ remotes: mocks.remotes });

  t.is(
    result["./remoteNameList"],
    `data:application/json,${JSON.stringify(Object.keys(mocks.remotes))}`
  );
});
