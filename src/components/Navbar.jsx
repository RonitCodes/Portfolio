import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/WhatIDo', label: 'What I Do' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact' }
];

// Embedded CSS styles (desktop gooey)
const gooeyNavStyles = `
.gooey-nav-container {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background-color: var(--bg-color, #000);
  border-bottom: 1px solid var(--primary-color, #28d740);
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
}

.gooey-nav-container nav ul {
  display: flex;
  gap: 2rem;
  margin: 0; padding: 0;
  list-style: none;
}

.gooey-nav-container a {
  color: var(--text-color, #fff);
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.gooey-nav-container a:hover {
  color: #fff;
  transform: translateY(-2px);
}

.gooey-nav-container li.active a {
  font-weight: 600;
  color: #fff;
}

@media (max-width: 768px) {
  /* Hide gooey nav on small screens */
  .gooey-nav-container { display: none; }
}
`;

// Simple mobile nav (Bootstrap-like)
function MobileNav({ items }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top d-md-none">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">My Site</a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {open && (
          <div className="bg-dark w-100 mt-2 rounded-3 p-2">
            <ul className="navbar-nav">
              {items.map((item) => (
                <li
                  key={item.href}
                  className={`nav-item ${location.pathname === item.href ? 'active' : ''}`}
                >
                  <a
                    className="nav-link text-light"
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

// Main Navbar Component
export default function Navbar() {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = gooeyNavStyles;
    document.head.appendChild(styleElement);
    return () => styleElement.remove();
  }, []);

  return (
    <>
      {/* Desktop Gooey Nav */}
      <div className="d-none d-md-block">
        <div className="gooey-nav-container">
          <nav>
            <ul>
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav items={NAVIGATION_ITEMS} />
    </>
  );
}
