const test = require("ava");
const isVue = require("../../src/utils/isVue");
const mocks = require("../mocks");

const compiler = {
  options: {
    module: {},
  },
};

test("isVue at noParse", async (t) => {
  compiler.options.module.noParse = /^(vue|vue-router|vuex|vuex-router-sync)$/;
  t.is(isVue(compiler), true);
});

test("isVue at rules", async (t) => {
  compiler.options.module.rules = [
    {
      test: /\.vue$/,
      use: [
        {
          loader: "vue-loader",
        },
      ],
    },
  ];
  t.is(isVue(compiler), true);
});

test("isVue at alias", async (t) => {
  compiler.resolve = {
    alias: {
      "@": "/Users/alanschio/Projects/lv/apps/web-customer/src",
      vue$: "vue/dist/vue.runtime.esm.js",
    },
  };
  t.is(isVue(compiler), true);
});
