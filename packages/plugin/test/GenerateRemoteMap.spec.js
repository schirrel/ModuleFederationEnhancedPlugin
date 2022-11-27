const test = require("ava");
const GenerateRemoteNameMap = require("../src/GenerateRemoteNameMap");
const mocks = require("./mocks");

test("Generate array with Remote names", async (t) => {
  const result = GenerateRemoteNameMap({ remotes: mocks.remotes });

  t.is(
    result["./remoteNameMap"],
    `data:application/json,${JSON.stringify(Object.keys(mocks.remotes))}`
  );
});
