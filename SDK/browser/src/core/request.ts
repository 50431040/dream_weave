import { getBaseUrl } from "./init";
import { log } from "./log";

export const initialRequest = (
  url: string,
  successCallback?: () => any,
  failCallback?: () => any
) => {
  let xhr: XMLHttpRequest;
  xhr = new XMLHttpRequest();
  xhr.open("GET", `${url}/init`);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        successCallback?.();
      } else {
        failCallback?.();
      }
    }
  };
};

export const msgRequest = function (
  name: string,
  params: Record<string, any>[],
  callback?: () => any
) {
  let xhr: XMLHttpRequest;
  xhr = new XMLHttpRequest();
  xhr.open("POST", `${getBaseUrl()}/${name}`);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        log(`${name} upload success`);
      } else {
        log(`${name} upload fail`, params);
      }
    }
  };
  xhr.send(JSON.stringify(params));
  callback?.();
};
