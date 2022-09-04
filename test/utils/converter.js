const test = require("ava");
const converter = require("../../src/utils/converter");
const mocks = require("../mocks");

test("Must convert remote string to object", async (t) => {
  const result = converter.convertStringToObject(mocks.remotes.app);
  t.deepEqual(result, {
    name: mocks.remotes.app.split("@")[0],
    url: mocks.remotes.app.split("@")[1],
  });
});

test("Must convert prop function remote to final object", async (t) => {
  const result = converter.convertToFinalObject(mocks.remotes.functionObjectApp);
  t.deepEqual(result, {
    name: mocks.remotes.functionObjectApp.name(),
    url: mocks.remotes.functionObjectApp.url(),
  });
});

