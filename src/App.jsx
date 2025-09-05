import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileErrorBoundary from "./components/MobileErrorBoundary";
import { isMobile, isIOS, isSafari, getDeviceInfo } from "./utils/mobileDetection";
import { browserCompatibilityCheck, logCompatibilityReport } from "./utils/browserCompatibility";

// Import the mobile CSS file
import "./styles/mobile.css";

const Hero = lazy(() => import("./components/Hero"));
const WhatIDo = lazy(() => import("./components/WhatIDo"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const LetterGlitch = lazy(() => import("./components/LetterGlitch"));

export default function App() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isIOS: false,
    isSafari: false,
    isCompatible: true
  });

  useEffect(() => {
    // Check browser compatibility first
    const compatibility = logCompatibilityReport();
    const deviceData = getDeviceInfo();
    
    setDeviceInfo({
      ...deviceData,
      isCompatible: compatibility.es6Support && compatibility.promiseSupport
    });

    // Add device-specific classes to body
    document.body.classList.toggle('is-mobile', deviceData.isMobile);
    document.body.classList.toggle('is-ios', deviceData.isIOS);
    document.body.classList.toggle('is-safari', deviceData.isSafari);
    document.body.classList.toggle('is-iphone', deviceData.isIPhone);

    // Additional dynamic CSS for specific devices
    if (deviceData.isIOS) {
      const dynamicCSS = `
        :root {
          --vh: ${window.innerHeight * 0.01}px;
        }
        
        .app-wrapper {
          height: calc(var(--vh, 1vh) * 100);
          min-height: -webkit-fill-available;
        }
      `;
      
      const styleElement = document.createElement('style');
      styleElement.textContent = dynamicCSS;
      document.head.appendChild(styleElement);
      
      // Update CSS custom property on resize
      const updateVH = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      };
      
      window.addEventListener('resize', updateVH);
      window.addEventListener('orientationchange', updateVH);
      
      return () => {
        window.removeEventListener('resize', updateVH);
        window.removeEventListener('orientationchange', updateVH);
        styleElement.remove();
      };
    }
  }, []);

  // Show compatibility warning for very old browsers
  if (!deviceInfo.isCompatible) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#28d740',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div>
          <h2>Browser Not Supported</h2>
          <p>Please update your browser or use a modern browser like Chrome, Firefox, or Safari.</p>
        </div>
      </div>
    );
  }

  return (
    <MobileErrorBoundary>
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <div className="glitch-bg">
          <Suspense fallback={
            <div className="loading-mobile">
              <div>Loading...</div>
            </div>
          }>
            <MobileErrorBoundary>
              <LetterGlitch
                glitchColors={["#28d740", "#1f1f1f", "#2e2e2e", "#61dca3"]}
                glitchSpeed={deviceInfo.isMobile ? 150 : 80}
                centerVignette={false}
                outerVignette={true}
                smooth={true}
              />
            </MobileErrorBoundary>
          </Suspense>
        </div>

        <MobileErrorBoundary>
          <Navbar />
        </MobileErrorBoundary>

        <main style={{ position: "relative", zIndex: 2, paddingTop: "80px", flex: 1 }}>
          <Suspense fallback={
            <div className="text-center mt-5 loading-mobile">
              Loading...
            </div>
          }>
            <MobileErrorBoundary>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/WhatIDo" element={<WhatIDo />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Hero />} />
              </Routes>
            </MobileErrorBoundary>
          </Suspense>
        </main>

        <MobileErrorBoundary>
          <Footer />
        </MobileErrorBoundary>
      </div>
    </MobileErrorBoundary>
  );
}