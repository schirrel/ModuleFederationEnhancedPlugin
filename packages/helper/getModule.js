/* eslint-disable */

import { getOrLoadRemote } from './getOrLoadRemote';

export const getModule = (remote, sharedScope, module, url) => {
  return async () => {
    await getOrLoadRemote(remote, sharedScope, url);
    const container = window[remote];
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
};