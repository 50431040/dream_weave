import { debounce } from "../utils";
import { browser, system, userAgent } from "./device";
import { getAPPID, getReportUrl, getUserId, isInitialized } from "./init";
import { log } from "./log";
import { version } from "../../package.json";

const request = function (params: Record<string, any>) {
  let xhr: XMLHttpRequest;
  xhr = new XMLHttpRequest();
  xhr.open("POST", getReportUrl());
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  log(params);
  xhr.send(JSON.stringify(params));
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 340) {
      } else {
      }
    }
  };
};

const requestDebounce = debounce(request, 500);

export const upload = function (data: Record<string, any>) {
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

  requestDebounce(params);
};
