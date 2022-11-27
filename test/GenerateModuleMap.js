const test = require("ava");
const GenerateModuleNameMap = require("../src/GenerateModuleNameMap");
const mocks = require("./mocks");

test("Generate array with exposed module names", async (t) => {
  const result = GenerateModuleNameMap({ exposes: mocks.exposes });

  t.is(
    result["./moduleNameMap"],
    `data:application/json,${JSON.stringify(Object.keys(mocks.exposes))}`
  );
});
