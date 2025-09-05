// src/utils/browserCompatibility.js

export const browserCompatibilityCheck = () => {
  const checks = {
    es6Support: typeof Symbol !== 'undefined',
    promiseSupport: typeof Promise !== 'undefined',
    fetchSupport: typeof fetch !== 'undefined',
    localStorageSupport: (() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    })(),
    serviceWorkerSupport: 'serviceWorker' in navigator,
    webGLSupport: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
      } catch (e) {
        return false;
      }
    })(),
    cssGridSupport: CSS && CSS.supports && CSS.supports('display', 'grid'),
    flexboxSupport: CSS && CSS.supports && CSS.supports('display', 'flex')
  };
  
  return checks;
};

export const logCompatibilityReport = () => {
  const checks = browserCompatibilityCheck();
  console.log('Browser Compatibility Report:', checks);
  
  const unsupportedFeatures = Object.keys(checks).filter(key => !checks[key]);
  if (unsupportedFeatures.length > 0) {
    console.warn('Unsupported features:', unsupportedFeatures);
  }
  
  return checks;
};

export const isModernBrowser = () => {
  const checks = browserCompatibilityCheck();
  const requiredFeatures = ['es6Support', 'promiseSupport', 'fetchSupport'];
  
  return requiredFeatures.every(feature => checks[feature]);
};

// Polyfill loader for older browsers
export const loadPolyfillsIfNeeded = async () => {
  const checks = browserCompatibilityCheck();
  
  if (!checks.promiseSupport) {
    console.log('Loading Promise polyfill...');
    // You would load a promise polyfill here
  }
  
  if (!checks.fetchSupport) {
    console.log('Loading fetch polyfill...');
    // You would load a fetch polyfill here
  }
  
  return checks;
};