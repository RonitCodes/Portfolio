import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import WhatIDoPage from './components/WhatIDo';
import SkillsPage from './components/Skills';
import ExperiencePage from './components/Experience';
import ContactPage from './components/Contact';
import LetterGlitch from './components/LetterGlitch';

export default function App() {
  return (
    <div className="app-wrapper">
      {/* Full-screen letter glitch background */}
      <div className="glitch-bg">
        <LetterGlitch
          glitchColors={['#28d740', '#1f1f1f', '#2e2e2e', '#61dca3']}
          glitchSpeed={80}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </div>
      
      <Navbar />

      <main style={{ position: 'relative', zIndex: 2, paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/what-i-do" element={<WhatIDoPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Hero />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}