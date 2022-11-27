const test = require("ava");
const GenerateModuleNameList = require("../src/GenerateModuleNameList");
const mocks = require("./mocks");

test("Generate array with exposed module names", async (t) => {
  const result = GenerateModuleNameList({ exposes: mocks.exposes });

  t.is(
    result["./remoteNameList"],
    `data:application/json,${JSON.stringify(Object.keys(mocks.exposes))}`
  );
});
