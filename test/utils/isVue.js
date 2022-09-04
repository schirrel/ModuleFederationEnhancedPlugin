const test = require("ava");
const isVue = require("../../src/utils/isVue");
const mocks = require("../mocks");


test("isVue at noParse", async (t) => {
  mocks.compiler.options.module.noParse = /^(vue|vue-router|vuex|vuex-router-sync)$/;
  t.is(isVue(mocks.compiler), true);
});

test("isVue at rules", async (t) => {
  mocks.compiler.options.module.rules = [
    {
      test: /\.vue$/,
      use: [
        {
          loader: "vue-loader",
        },
      ],
    },
  ];
  t.is(isVue(mocks.compiler), true);
});

test("isVue at alias", async (t) => {
  mocks.compiler.resolve = {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
    },
  };
  t.is(isVue(mocks.compiler), true);
});
test("isVue at alias extension", async (t) => {
  mocks.compiler.resolve = {
    alias: {},
    extensions: [".js", ".vue"],
  };
  t.is(isVue(mocks.compiler), true);
});

test("isVue is false", async (t) => {
  mocks.compiler.options = {};
  t.is(isVue(mocks.compiler), false);
});
