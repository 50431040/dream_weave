import { isInitialized } from "./init";
import { log } from "./log";
import { upload } from "./upload";

export const onEvent = (name: string, params: Record<string, string>) => {
  if (!isInitialized()) {
    log(`sdk not init.`);
    return;
  }

  if (typeof name !== "string" || !name) {
    log(`event name is not valid`);
    return;
  }

  if (params && Object.prototype.toString.call(params) !== "[object Object]") {
    log(`params is not valid`);
    return;
  }

  upload({
    name,
    params,
  });
};
