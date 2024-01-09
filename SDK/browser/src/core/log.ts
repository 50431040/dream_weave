import { isDebug } from "./init";

export const log = (...args: any) => {
  if (isDebug()) {
    console.warn("【DreamWeave Log】", ...args);
  }
};
