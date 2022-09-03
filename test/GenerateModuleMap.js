const test = require("ava");
const GenerateModuleMap = require("../src/GenerateModuleMap");
const mocks = require("./mocks");

test("Generate array with exposed module names", async (t) => {
  const result = GenerateModuleMap({ exposes: mocks.exposes });

  t.is(
    result["./moduleMap"],
    `data:application/json,${JSON.stringify(Object.keys(mocks.exposes))}`
  );
});
