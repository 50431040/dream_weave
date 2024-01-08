import { log } from "./log";
import { initialRequest } from "./request";
import { uploadEvent } from "./upload";

let _initialized = false;
let _appId = "";
let _userId: string = "";
let _debug = false;
let _baseUrl = "";

export function initSDK(
  appId: string,
  baseUrl: string,
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

  if (typeof baseUrl !== "string" || !baseUrl) {
    log("baseUrl is not valid");
    return;
  }

  initialRequest(
    baseUrl,
    () => {
      _appId = appId;
      _debug = debug;
      _baseUrl = baseUrl;
      _initialized = true;
      uploadEvent();
    },
    () => {
      _initialized = false;
    }
  );
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

export function getBaseUrl() {
  return _baseUrl;
}
