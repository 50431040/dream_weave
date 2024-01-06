import { log } from "./log";

let _initialized = false;
let _appId = "";
let _userId: string = "";
let _debug = false;
let _reportUrl = "";

export function initSDK(
  appId: string,
  reportUrl: string,
  debug: boolean = false
) {
  if (typeof window === "undefined") {
    log("window is undefined");
    return;
  }

  if (_initialized) {
    log("already init");
    return;
  }

  if (typeof appId !== "string" || !appId) {
    log("appId is not valid");
    return;
  }

  if (typeof reportUrl !== "string" || !reportUrl) {
    log("reportUrl is not valid");
    return;
  }

  _appId = appId;
  _debug = debug;
  _reportUrl = reportUrl;
  _initialized = true;
}

export function isInitialized() {
  return _initialized;
}

export function getAPPID() {
  return _appId;
}

export function setUserId(userId: string) {
  _userId = userId;
}

export function getUserId() {
  return _userId;
}

export function isDebug() {
  return _debug;
}

export function getReportUrl() {
  return _reportUrl;
}