import React, { useEffect, useRef } from 'react';

// Replace the .animated-blob in your Hero.jsx with this component
export default function AdvancedAnimatedComponent() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // Particle class for the swirling effect
    class Particle {
      constructor(angle, radius, speed) {
        this.angle = angle;
        this.radius = radius;
        this.speed = speed;
        this.baseRadius = radius;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.size = Math.random() * 3 + 1;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.angle += this.speed;
        this.radius = this.baseRadius + Math.sin(time * 0.002 + this.pulsePhase) * 10;
        this.opacity = 0.4 + Math.sin(time * 0.003 + this.pulsePhase) * 0.3;
      }

      draw(ctx, centerX, centerY) {
        const x = centerX + Math.cos(this.angle) * this.radius;
        const y = centerY + Math.sin(this.angle) * this.radius;
        
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#28d740';
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = '#28d740';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 2;
        const radius = 30 + Math.random() * 40;
        const speed = 0.01 + Math.random() * 0.02;
        particlesRef.current.push(new Particle(angle, radius, speed));
      }
    };

    // Draw morphing central shape
    const drawMorphingShape = (ctx, centerX, centerY, time) => {
      const vertices = 8;
      const baseRadius = 25;
      
      ctx.beginPath();
      
      for (let i = 0; i <= vertices; i++) {
        const angle = (i / vertices) * Math.PI * 2;
        const radiusVariation = Math.sin(time * 0.003 + angle * 3) * 8 + 
                               Math.cos(time * 0.002 + angle * 2) * 5;
        const radius = baseRadius + radiusVariation;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.closePath();
      
      // Create gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius + 15);
      gradient.addColorStop(0, '#28d740');
      gradient.addColorStop(0.7, '#61dca3');
      gradient.addColorStop(1, 'rgba(40, 215, 64, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add pulsing border
      ctx.strokeStyle = '#28d740';
      ctx.lineWidth = 2 + Math.sin(time * 0.005) * 1;
      ctx.shadowColor = '#28d740';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    // Draw energy rings
    const drawEnergyRings = (ctx, centerX, centerY, time) => {
      for (let i = 0; i < 3; i++) {
        const ringRadius = 60 + i * 25;
        const opacity = 0.3 - i * 0.1;
        const rotation = time * 0.001 * (i + 1);
        
        ctx.globalAlpha = opacity * (0.5 + Math.sin(time * 0.003 + i) * 0.3);
        ctx.strokeStyle = '#28d740';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 10]);
        ctx.lineDashOffset = rotation * 50;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.setLineDash([]);
      }
      ctx.globalAlpha = 1;
    };

    // Draw connecting lines between particles
    const drawConnections = (ctx, centerX, centerY) => {
      ctx.strokeStyle = 'rgba(40, 215, 64, 0.2)';
      ctx.lineWidth = 1;
      
      particlesRef.current.forEach((particle, i) => {
        const x1 = centerX + Math.cos(particle.angle) * particle.radius;
        const y1 = centerY + Math.sin(particle.angle) * particle.radius;
        
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const x2 = centerX + Math.cos(otherParticle.angle) * otherParticle.radius;
          const y2 = centerY + Math.sin(otherParticle.angle) * otherParticle.radius;
          
          const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          
          if (distance < 60) {
            ctx.globalAlpha = (60 - distance) / 60 * 0.3;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        });
      });
      ctx.globalAlpha = 1;
    };

    // Main animation loop
    const animate = () => {
      timeRef.current = Date.now();
      const time = timeRef.current;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw energy rings (background)
      drawEnergyRings(ctx, centerX, centerY, time);
      
      // Draw connecting lines
      drawConnections(ctx, centerX, centerY);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(time);
        particle.draw(ctx, centerX, centerY);
      });
      
      // Draw central morphing shape (foreground)
      drawMorphingShape(ctx, centerX, centerY, time);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="advanced-animated-component">
      <canvas
        ref={canvasRef}
        style={{
          width: '200px',
          height: '200px',
          display: 'block',
          margin: '0 auto',
          filter: 'drop-shadow(0 0 20px rgba(40, 215, 64, 0.3))'
        }}
      />
    </div>
  );
}