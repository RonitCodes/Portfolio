import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Hero = lazy(() => import("./components/Hero"));
const WhatIDo = lazy(() => import("./components/WhatIDo"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const LetterGlitch = lazy(() => import("./components/LetterGlitch"));

export default function App() {
  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">
      <div className="glitch-bg">
        <Suspense fallback={<div style={{ background: "#000", height: "100vh" }} />}>
          <LetterGlitch
            glitchColors={["#28d740", "#1f1f1f", "#2e2e2e", "#61dca3"]}
            glitchSpeed={window.innerWidth < 768 ? 150 : 80}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
          />
        </Suspense>
      </div>

      <Navbar />

       <main style={{ position: "relative", zIndex: 2, paddingTop: "80px", flex: 1 }}>
        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
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
