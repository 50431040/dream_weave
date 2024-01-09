import { debounce } from "../utils";
import { browser, system, userAgent } from "./device";
import { getAPPID, getUserId, isInitialized } from "./init";
import { log } from "./log";
import { version } from "../../package.json";
import { msgRequest } from "./request";

const uploadDebounce = debounce(msgRequest, 500);
let eventArr: Record<string, any>[] = [];

export const uploadEvent = function (data?: Record<string, any>) {
  if (data) {
    eventArr.push(data);
  }

  // When sdk not initialized, data is stored and uploaded after initialization.
  if (!isInitialized()) {
    log("sdk not init. Will be uploaded after initialization");
    return;
  }

  if (eventArr.length === 0) {
    return;
  }

  log("start upload.");
  uploadDebounce(
    "event",
    eventArr.map((item) => ({
      appId: getAPPID(),
      userId: getUserId(),
      origin: window.location.origin,
      uri: window.location.href,
      timestamp: Date.now(),
      version,
      browser,
      system,
      userAgent,
      ...item,
    })),
    () => {
      log("upload ends.");
      eventArr = [];
    }
  );
};
