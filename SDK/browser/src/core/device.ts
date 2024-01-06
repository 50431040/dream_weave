const userAgent: string = navigator.userAgent.toLowerCase(); //浏览器信息

const getBrowserType = () => {
  // IE
  if (/msie|trident/.test(userAgent)) {
    // IE11
    if (/msie \d+/.test(userAgent)) {
      return `IE ${userAgent.match(/msie (\d+)/)![1]}`;
    }

    return "IE > 11";
  }

  // edge
  if (/edge\/(\d+)/.test(userAgent)) {
    return `Edge ${userAgent.match(/edge\/(\d+)/)![1]}`;
  }

  // firefox
  if (/firefox\/(\d+)/.test(userAgent)) {
    return `Firefox ${userAgent.match(/firefox\/(\d+)/)![1]}`;
  }

  // chrome
  if (/chrome\/(\d+)/.test(userAgent)) {
    return `Chrome ${userAgent.match(/chrome\/(\d+)/)![1]}`;
  }

  // safari
  if (/safari\/(\d+)/.test(userAgent)) {
    return `Safari ${userAgent.match(/safari\/(\d+)/)![1]}`;
  }

  return "Unknown";
};

const getSystemType = () => {
  const appVersion = navigator.appVersion?.toLowerCase();
  // MacOS
  if (/mac/i.test(appVersion)) {
    return "MacOS";
  }

  // Windows
  if (/win/i.test(appVersion)) {
    return "Windows";
  }

  // IOS
  if (/ios/i.test(appVersion)) {
    return "IOS";
  }

  // Android
  if (/android/i.test(appVersion)) {
    return "Android";
  }

  // Linux
  if (/linux/i.test(appVersion)) {
    return "Linux";
  }

  return "Unknown";
};

const browser = getBrowserType();
const system = getSystemType();

export { userAgent, browser, system };
