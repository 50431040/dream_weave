import { debounce } from "../utils";
import { browser, system, userAgent } from "./device";
import { getAPPID, getUserId, isInitialized } from "./init";
import { log } from "./log";
import { version } from "../../package.json";
import { msgRequest } from "./request";

const uploadDebounce = debounce(msgRequest, 500);
let eventArr: Record<string, any>[] = [];

export const uploadEvent = function (data: Record<string, any>) {
  if (!isInitialized()) {
    log("sdk not init.");
    return;
  }

  const params: Record<string, any> = {
    appId: getAPPID(),
    userId: getUserId(),
    origin: window.location.origin,
    uri: window.location.href,
    timestamp: Date.now(),
    version,
    browser,
    system,
    userAgent,
    ...data,
  };
  eventArr.push(params);

  uploadDebounce("event", eventArr, () => {
    eventArr = [];
  });
};
