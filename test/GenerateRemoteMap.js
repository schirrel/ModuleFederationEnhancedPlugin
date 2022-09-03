const test = require("ava");
const GenerateRemoteMap = require("../src/GenerateRemoteMap");
const mocks = require("./mocks");

test("Generate array with Remote names", async (t) => {
  const result = GenerateRemoteMap({ remotes: mocks.remotes });

  t.is(
    result["./remoteMap"],
    `data:application/json,${JSON.stringify(Object.keys(mocks.remotes))}`
  );
});
