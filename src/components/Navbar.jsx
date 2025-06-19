import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/what-i-do', label: 'What I Do' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' }
];

// Embedded CSS styles
const gooeyNavStyles = `
:root {
  --color-1: #28d740;
  --color-2: #61dca3;
  --color-3: #ffffff;
  --color-4: #1f1f1f;
}

.gooey-nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--primary-color);
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
}

.gooey-nav-container nav {
  position: relative;
  z-index: 2;
}

.gooey-nav-container ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}

.gooey-nav-container li {
  position: relative;
  z-index: 3;
}

.gooey-nav-container a {
  display: block;
  padding: 0.75rem 1.5rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 4;
  cursor: pointer;
}

.gooey-nav-container a:hover {
  color: #ffffff;
  transform: translateY(-2px);
}

.gooey-nav-container li.active a {
  color: #ffffff;
  font-weight: 600;
}

.effect {
  position: absolute;
  pointer-events: none;
  z-index: 1;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.effect.filter {
  background: var(--primary-color);
  filter: blur(20px) contrast(20);
  opacity: 0.8;
  box-shadow: 0 0 30px var(--primary-color);
}

.effect.text {
  background: linear-gradient(135deg, var(--primary-color), #61dca3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.effect.text.active {
  opacity: 1;
  transform: scale(1);
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transform: translate(-50%, -50%) translate(var(--start-x), var(--start-y)) scale(0);
  animation: particleMove var(--time) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.particle .point {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--color);
  transform: scale(var(--scale)) rotate(var(--rotate));
  box-shadow: 
    0 0 10px var(--color),
    0 0 20px var(--color),
    0 0 30px var(--color);
  animation: particlePulse calc(var(--time) / 3) ease-in-out infinite alternate;
}

@keyframes particleMove {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(var(--start-x), var(--start-y)) scale(0);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, -50%) translate(var(--start-x), var(--start-y)) scale(var(--scale));
  }
  90% {
    opacity: 1;
    transform: translate(-50%, -50%) translate(var(--end-x), var(--end-y)) scale(var(--scale));
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translate(var(--end-x), var(--end-y)) scale(0);
  }
}

@keyframes particlePulse {
  0% {
    transform: scale(calc(var(--scale) * 0.8)) rotate(var(--rotate));
    filter: brightness(1);
  }
  100% {
    transform: scale(calc(var(--scale) * 1.2)) rotate(calc(var(--rotate) + 180deg));
    filter: brightness(1.5);
  }
}

.effect.filter.active {
  animation: gooeyPulse var(--time) ease-in-out;
}

@keyframes gooeyPulse {
  0% {
    transform: scale(1);
    filter: blur(20px) contrast(20);
  }
  50% {
    transform: scale(1.1);
    filter: blur(25px) contrast(25);
  }
  100% {
    transform: scale(1);
    filter: blur(20px) contrast(20);
  }
}

@media (max-width: 768px) {
  .gooey-nav-container ul {
    gap: 1rem;
  }
  
  .gooey-nav-container a {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
`;

// GooeyNav Component
const GooeyNav = ({ 
  items, 
  animationTime = 600, 
  particleCount = 20, 
  particleDistances = [80, 15],
  particleR = 120,
  timeVariance = 200,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Set active index based on current route
  const getCurrentIndex = () => {
    return items.findIndex(item => item.href === location.pathname);
  };
  
  const [activeIndex, setActiveIndex] = useState(() => {
    const currentIndex = getCurrentIndex();
    return currentIndex !== -1 ? currentIndex : initialActiveIndex;
  });
  
  const navRef = useRef(null);
  const effectRef = useRef(null);

  // Update active index when route changes
  useEffect(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  const colorMap = {
    1: 'var(--color-1)',
    2: 'var(--color-2)', 
    3: 'var(--color-3)',
    4: 'var(--color-4)'
  };

  const createParticles = (element, index) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = particleDistances[0] + Math.random() * (particleDistances[1] - particleDistances[0]);
      const time = animationTime + Math.random() * timeVariance;
      
      const startX = Math.cos(angle) * particleDistances[1];
      const startY = Math.sin(angle) * particleDistances[1];
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;
      
      const colorIndex = colors[index % colors.length];
      const color = colorMap[colorIndex] || colorMap[1];
      
      particle.style.setProperty('--start-x', `${startX}px`);
      particle.style.setProperty('--start-y', `${startY}px`);
      particle.style.setProperty('--end-x', `${endX}px`);
      particle.style.setProperty('--end-y', `${endY}px`);
      particle.style.setProperty('--time', `${time}ms`);
      particle.style.setProperty('--color', color);
      particle.style.setProperty('--scale', Math.random() * 0.5 + 0.5);
      particle.style.setProperty('--rotate', `${Math.random() * 360}deg`);
      
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      
      const point = document.createElement('div');
      point.className = 'point';
      particle.appendChild(point);
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, time + 100);
    }
  };

  const handleNavClick = (e, index) => {
    e.preventDefault(); // Prevent default link behavior
    setActiveIndex(index);
    createParticles(e.currentTarget, index);
    
    // Use React Router's navigate function
    navigate(items[index].href);
  };

  return (
    <div className="gooey-nav-container" ref={navRef}>
      <nav>
        <ul>
          {items.map((item, index) => (
            <li key={index} className={activeIndex === index ? 'active' : ''}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, index)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div 
          ref={effectRef}
          className={`effect filter ${activeIndex !== null ? 'active' : ''}`}
          style={{
            '--time': `${animationTime}ms`
          }}
        />
      </nav>
    </div>
  );
};

// Main Navbar Component
export default function Navbar() {
  // Inject styles into the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = gooeyNavStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      // Cleanup on unmount
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <GooeyNav
      items={NAVIGATION_ITEMS}
      animationTime={600}
      particleCount={20}
      particleDistances={[80, 15]}
      particleR={120}
      timeVariance={200}
      colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      initialActiveIndex={0}
    />
  );
}