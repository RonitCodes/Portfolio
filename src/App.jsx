import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Keep your boundaries & utilities
import MobileErrorBoundary from "./components/MobileErrorBoundary";
import { isMobile as _isMobile, isIOS as _isIOS, isSafari as _isSafari, getDeviceInfo } from "./utils/mobileDetection";
import { logCompatibilityReport } from "./utils/browserCompatibility";

// Import the mobile CSS file
import "./styles/mobile.css";

// --- Lazy sections (as you already had) ---
const Hero = lazy(() => import("./components/Hero"));
const WhatIDo = lazy(() => import("./components/WhatIDo"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const LetterGlitch = lazy(() => import("./components/LetterGlitch"));

// Optional: make Navbar/Footer lazy as well to shrink the very first JS payload on mobile
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

// Lightweight loading placeholder used in multiple places
function LoadingFallback({ padded = false, label = "Loading…" }) {
  return (
    <div
      className="loading-mobile"
      style={{
        padding: padded ? "16px" : undefined,
        textAlign: "center",
        marginTop: padded ? "10vh" : undefined,
      }}
    >
      <div>{label}</div>
    </div>
  );
}

// Small requestIdleCallback polyfill (helps iOS)
function onIdle(fn, { timeout = 2000 } = {}) {
  if ("requestIdleCallback" in window) {
    // @ts-ignore
    window.requestIdleCallback(fn, { timeout });
  } else {
    setTimeout(fn, 1);
  }
}

export default function App() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isIOS: false,
    isSafari: false,
    isIPhone: false,
    isCompatible: true,
  });

  // Track when the browser is idle (so we can mount non-critical visuals)
  const [isIdle, setIsIdle] = useState(false);

  // Detect reduced motion and a (very) rough “low-end” signal
  const prefersReducedMotion = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
    []
  );
  const deviceMemory = // iOS doesn’t expose this; assume 2 (low) if unknown
    typeof navigator !== "undefined" && "deviceMemory" in navigator
      ? // @ts-ignore
        navigator.deviceMemory || 2
      : 2;
  const isLowEnd = deviceMemory <= 2;

  useEffect(() => {
    // Compatibility + device info
    const compatibility = logCompatibilityReport(); // your util
    const di = getDeviceInfo();

    setDeviceInfo({
      ...di,
      isCompatible: compatibility.es6Support && compatibility.promiseSupport,
    });

    // Body classes for targeted CSS
    document.body.classList.toggle("is-mobile", di.isMobile);
    document.body.classList.toggle("is-ios", di.isIOS);
    document.body.classList.toggle("is-safari", di.isSafari);
    document.body.classList.toggle("is-iphone", di.isIPhone);

    // iOS viewport height fix
    if (di.isIOS) {
      const styleElement = document.createElement("style");
      const setVH = () => {
        document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
      };
      styleElement.textContent = `
        :root { --vh: ${window.innerHeight * 0.01}px; }
        .app-wrapper { height: calc(var(--vh, 1vh) * 100); min-height: -webkit-fill-available; }
      `;
      document.head.appendChild(styleElement);
      window.addEventListener("resize", setVH);
      window.addEventListener("orientationchange", setVH);

      return () => {
        window.removeEventListener("resize", setVH);
        window.removeEventListener("orientationchange", setVH);
        styleElement.remove();
      };
    }
  }, []);

  // Signal idle after first paint
  useEffect(() => {
    onIdle(() => setIsIdle(true));
  }, []);

  // Decide whether to allow heavy visual effects (LetterGlitch / big filters)
  const allowHeavyFX = useMemo(() => {
    // Skip heavy visuals on iOS, on low-end devices, or if user prefers reduced motion
    if (prefersReducedMotion) return false;
    if (isLowEnd) return false;
    if (deviceInfo.isIOS) return false;
    return true;
  }, [deviceInfo.isIOS, isLowEnd, prefersReducedMotion]);

  // Warm the cache for likely next chunks once we're idle (helps mobile Safari a lot)
  useEffect(() => {
    if (!isIdle) return;
    // Fire-and-forget prefetch of other sections/routes
    import("./components/WhatIDo");
    import("./components/Skills");
    import("./components/Experience");
    import("./components/Contact");
    // If you keep Navbar/Footer lazy, warm them too (first load might show fallback briefly)
    import("./components/Navbar");
    import("./components/Footer");
  }, [isIdle]);

  // Show compatibility warning for very old browsers
  if (!deviceInfo.isCompatible) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#28d740",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
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
        {/* Defer/disable heavy background glitch on iPhone/low-end/reduced-motion */}
        <div className="glitch-bg">
          <Suspense fallback={<LoadingFallback padded />}>
            <MobileErrorBoundary>
              {allowHeavyFX && isIdle ? (
                <LetterGlitch
                  glitchColors={["#28d740", "#1f1f1f", "#2e2e2e", "#61dca3"]}
                  glitchSpeed={deviceInfo.isMobile ? 150 : 80}
                  centerVignette={false}
                  outerVignette={true}
                  smooth={true}
                />
              ) : (
                // Lightweight static backdrop (cheap to paint on iOS)
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(1200px 600px at 50% -10%, rgba(40,215,64,0.08), rgba(0,0,0,0))",
                    pointerEvents: "none",
                  }}
                />
              )}
            </MobileErrorBoundary>
          </Suspense>
        </div>

        {/* Navbar is lazy to reduce initial bytes; warmed on idle above */}
        <MobileErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Navbar />
          </Suspense>
        </MobileErrorBoundary>

        <main style={{ position: "relative", zIndex: 2, paddingTop: "80px", flex: 1 }}>
          <Suspense fallback={<LoadingFallback padded />}>
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
          <Suspense fallback={<LoadingFallback />}>
            <Footer />
          </Suspense>
        </MobileErrorBoundary>
      </div>
    </MobileErrorBoundary>
  );
}
