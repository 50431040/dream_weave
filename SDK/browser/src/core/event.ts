import { isInitialized } from "./init";
import { log } from "./log";
import { uploadEvent } from "./upload";

export const onEvent = (name: string, params: Record<string, string>) => {
  if (typeof name !== "string" || !name) {
    log(`event name is not valid`);
    return;
  }

  if (params && Object.prototype.toString.call(params) !== "[object Object]") {
    log(`params is not valid`);
    return;
  }

  uploadEvent({
    name,
    params,
  });
};
