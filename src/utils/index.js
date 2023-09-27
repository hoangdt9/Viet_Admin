import { useEffect } from "react";

import { toast } from 'react-toastify';


export const authHeader = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    // let user = JSON.parse();
    console.log(user);
    if (user && user.token){
        return {
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            os: getOSName(),
            browser: getBrowserName(),
            device: getDevice()
        }
    } else {
        return {};
    }
}

export const handleResponse = async (response, onError) => {
    const res = await response;
    const text = await res.text();

    const data = text && JSON.parse(text);
    if (!res.ok){
        if (res.status === 401 && onError){
            onError();
        }

        const error = (data && data.message) || res.statusText;
        toast.error(data.message);
        // throw new Error(error);
    }

    return data;
}


export default function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      const { target } = event;
      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}

export const isNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export const getBrowserName = () => {
  // Get browser name
  let browserName = '';
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
      browserName = 'Opera';
  } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      browserName = 'Chrome';
  } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      browserName = 'Firefox';
  } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      browserName = 'Safari';
  } else if (navigator.userAgent.indexOf("Edge") !== -1) {
      browserName = 'Edge';
  } else if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode === true) {
      browserName = 'Internet Explorer';
  } else {
      browserName = 'Unknown';
  }

  return browserName;
}

export const getOSName = () => {
  // Get operating system information
  let OSName = "Unknown";
  if (window.navigator.userAgent.indexOf("Windows") !== -1) {
    OSName = "Windows";
  } else if (window.navigator.userAgent.indexOf("Mac") !== -1) {
    OSName = "MacOS";
  } else if (window.navigator.userAgent.indexOf("Linux") !== -1) {
    OSName = "Linux";
  } else if (window.navigator.userAgent.indexOf("Android") !== -1) {
    OSName = "Android";
  } else if (window.navigator.userAgent.indexOf("iOS") !== -1) {
    OSName = "iOS";
  }

  return OSName;
}

export const getDevice = () => {
  // Check device type
  let deviceType = '';
  var userAgent = navigator.userAgent.toLowerCase();

  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(userAgent)) {
    deviceType = 'Mobile';
  } else if (/ipad|tablet|playbook|silk/i.test(userAgent)) {
    deviceType = 'Tablet';
  } else {
    deviceType = 'Desktop';
  }
  return deviceType;
}