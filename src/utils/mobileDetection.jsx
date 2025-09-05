// src/utils/mobileDetection.js

export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isSafari = () => {
  if (typeof window === 'undefined') return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const isIPhone = () => {
  if (typeof window === 'undefined') return false;
  return /iPhone/.test(navigator.userAgent);
};

export const getDeviceInfo = () => {
  return {
    isMobile: isMobile(),
    isIOS: isIOS(),
    isSafari: isSafari(),
    isIPhone: isIPhone(),
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
  };
};

// Additional mobile utilities
export const getViewportHeight = () => {
  if (typeof window === 'undefined') return '100vh';
  
  // For iOS Safari, use the actual viewport height
  if (isIOS()) {
    return `${window.innerHeight}px`;
  }
  
  // For other browsers, use vh units
  return '100vh';
};

export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') return { top: 0, bottom: 0 };
  
  const style = getComputedStyle(document.documentElement);
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0')
  };
};