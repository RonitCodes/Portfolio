import React from 'react';
import FuzzyText from './FuzzyText'
import AdvancedAnimatedComponent from './AdvancedAnimatedComponent' // Add this import

export default function Hero() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <div className="hero-card fade-in text-center">
        {/* Replace the animated-blob div with the new component */}
        <AdvancedAnimatedComponent />
        <div className="mt-4 fw-bold fuzzy-text-container hero-text-custom">
          <FuzzyText
            fontSize="clamp(2rem, 8vw, 4rem)"
            fontWeight={900}
            color="#28d740"
            enableHover={true}
            baseIntensity={0.15}
            hoverIntensity={0.5}
            fontFamily="Courier New "
          >
            I'm Ronit Sharma
          </FuzzyText>
        </div>
        <p className="mt-3">
          Computer Science and Mathematics from VCU, Software Engineer @ Bank of America, AI and Web Dev Enthusiast
        </p>
      </div>
    </div>
  );
}