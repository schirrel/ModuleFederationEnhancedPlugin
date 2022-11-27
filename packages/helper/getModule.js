/* eslint-disable */

import { injectScript } from "@module-federation/utilities";

const isObject = (module) =>
  module instanceof Object && !(module instanceof Array);

const isExportDefault = (module) =>
  Object.keys(module)?.length == 1 && Object.keys(module)[0] === "default";

export const getModule = async ({ remote, module, url }) => {
  if (!remote || !module) {
    throw new Error(
      "ModuleFederationEnhancedPlugin Helper: `remote` and `module` are required to load a module."
    );
  }
  const container =
    window[remote] ||
    (await injectScript({
      global: remote,
      url: url,
    }));

  const factory = await container.get(module);
  const Module = factory();
  if (isObject(Module)) {
    return isExportDefault(Module) ? Module.default : Module;
  }

  return Module;
};