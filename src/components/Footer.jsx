import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">
          © {new Date().getFullYear()} RonIT. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
