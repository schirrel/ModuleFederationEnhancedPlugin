/* eslint-disable */
import { getModule } from "./getModule";

const loadModule = async (props) => {
  const { remote, url, module } = props;

  if (!remote || !url || !module) {
    return "No system specified";
  }

  const Module = getModule(remote, "default", module, url);
  const Component = await Module();

  return Component;
};

// const convertListToMap = (list) => {
//   let map = {};
//   list.forEach((item) => {
//     map = Object.assign(map, item);
//   });
//   return map;
// };

const loadRemotes = async () => {
//   const remoteUrlListFactory = await window.pwa.get("./remoteUrlList");
//   const remoteList = remoteUrlListFactory();
//   const remoteMap = convertListToMap(remoteList);
const remoteUrlMapFactory = await window.pwa.get("./remoteUrlMap");
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
          modules: moduleMap,
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
          const moduleName = module.replace("./", "");
          modulesObject[moduleName] = {
            remote: remote.remote,
            moduleName: module.replace("./", ""),
            module: moduleLoaded,
          };
          resolve();
        })
      );
    });
  });

  await Promise.all(modulesLoaded);
  return modulesObject;
};

export async function loadRemoteAndModules() {
  const remotes = await loadRemotes();
  const modules = await loadModules(remotes);
  return modules;
}
