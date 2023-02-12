/* eslint-disable */
import { getModule } from "./getModule";

const loadModule = async (props) => {
  const { remote, url, module } = props;

  if (!remote || !url || !module) {
    throw new Error(
      "ModuleFederationEnhancedPlugin Helper: `remote`, `url` and `module` are required to load a module."
    );
  }
  try {
    const Module = getModule({ remote, module, url });
    return Module;
  } catch (e) {
    return null;
  }
};

const loadRemotes = async (hostName) => {
  const remoteUrlMapFactory = await window[hostName].get("./remoteUrlMap");
  const remoteMap = remoteUrlMapFactory();
  const remotePromises = [];
  Object.keys(remoteMap).forEach(async (key) => {
    remotePromises.push(
      new Promise(async (resolve) => {
        const moduleMap = await loadModule({
          remote: key,
          url: remoteMap[key],
          module: "./moduleNameList",
        });
        resolve({
          remote: key,
          url: remoteMap[key],
          modules: moduleMap || [],
        });
      })
    );
  });

  const remotes = await Promise.all(remotePromises);
  return remotes;
};

const loadModules = async (remotes) => {
  const modulesLoaded = [];
  const modulesObject = {};
  remotes.forEach((remote) => {
    remote.modules.forEach(async (module) => {
      modulesLoaded.push(
        new Promise(async (resolve) => {
          const moduleLoaded = await loadModule({
            remote: remote.remote,
            url: remote.url,
            module: module,
          });
          if (moduleLoaded) {
            const moduleName = module.replace("./", "");
            modulesObject[moduleName] = {
              remote: remote.remote,
              moduleName: module.replace("./", ""),
              module: moduleLoaded,
            };
          }
          resolve();
        })
      );
    });
  });

  await Promise.all(modulesLoaded);
  return modulesObject;
};

export async function loadRemoteAndModules(hostName) {
  const remotes = await loadRemotes(hostName);
  const modules = await loadModules(remotes);
  return modules;
}
