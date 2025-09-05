import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { isMobile, isIOS, isSafari, getDeviceInfo } from "./utils/mobileDetection";

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
    isSafari: false
  });

  useEffect(() => {
    // Detect device type after component mounts
    const info = getDeviceInfo();
    setDeviceInfo(info);

    // Add device-specific classes to body
    document.body.classList.toggle('is-mobile', info.isMobile);
    document.body.classList.toggle('is-ios', info.isIOS);
    document.body.classList.toggle('is-safari', info.isSafari);
    document.body.classList.toggle('is-iphone', info.isIPhone);

    // Additional dynamic CSS for specific devices
    if (info.isIOS) {
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

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <div className="glitch-bg">
        <Suspense fallback={
          <div className="loading-mobile">
            <div>Loading...</div>
          </div>
        }>
          <LetterGlitch
            glitchColors={["#28d740", "#1f1f1f", "#2e2e2e", "#61dca3"]}
            glitchSpeed={deviceInfo.isMobile ? 150 : 80}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
          />
        </Suspense>
      </div>

      <Navbar />

      <main style={{ position: "relative", zIndex: 2, paddingTop: "80px", flex: 1 }}>
        <Suspense fallback={
          <div className="text-center mt-5 loading-mobile">
            Loading...
          </div>
        }>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/WhatIDo" element={<WhatIDo />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Hero />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}