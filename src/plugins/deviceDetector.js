import DeviceDetector from "device-detector-js";

export function useDevices() {
  const deviceDetector = new DeviceDetector();
  const detector = deviceDetector.parse(window.navigator.userAgent);
  return {
    browser: {
      chrome: detector.client.name == "Chrome",
      chrome_view: detector.client.name == "Chrome Webview",
      chrome_mobile: detector.client.name == "Chrome Mobile",
      chrome_mobile_ios: detector.client.name == "Chrome Mobile iOS",
      safari: detector.client.name == "Safari",
      safari_mobile: detector.client.name == "Mobile Safari",
      msedge: detector.client.name == "Microsoft Edge",
      msie_mobile: detector.client.name == "IE Mobile",
      msie: detector.client.name == "Internet Explorer",
    },
  };
}
