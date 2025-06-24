import React from 'react';

const styles = `
  .hero-card {
    background: #1f1f1f;
    padding: 2rem;
    border-radius: .5rem;
    border: 2px solid var(--primary-color);
    animation: borderPulse 3s ease-in-out infinite;
    z-index: 2;
  }
  @keyframes borderPulse {
    0%   { box-shadow: 0 0  8px var(--primary-color); border-color: var(--primary-color); }
    50%  { box-shadow: 0 0 12px #ffffff;               border-color: #ffffff; }
    100% { box-shadow: 0 0  8px var(--primary-color); border-color: var(--primary-color); }
  }
`;

export default function WhatIDo() {
  const services = [
    {
      title: 'Full-Stack Web Development',
      description: 'I bring ideas to life through modern web technologies. From designing intuitive user interfaces with React and JavaScript to building robust backend systems with Node.js and Flask, I create seamless digital experiences. My work at Bank of America involved developing multilingual automation tools that saved 200+ hours annually, proving that great code solves real problems.',
      technologies: ['React', 'Node.js', 'JavaScript', 'HTML/CSS', 'REST APIs']
    },
    {
      title: 'AI & Machine Learning',
      description: 'Machine learning isn\'t just about mimicking intelligence—it\'s about creating solutions that push boundaries. At VCU\'s AI Lab, I developed optimization algorithms for 5G/6G systems that improved network efficiency by 25%. Using Python, TensorFlow, and Scikit-learn, I build models that achieve 90%+ accuracy rates and transform data into actionable insights.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras']
    },
    {
      title: 'Data Science & Analytics',
      description: 'Every dataset tells a story, and I speak the language of statistics and probability to uncover it. I transform raw numbers into compelling narratives that drive decision-making. My experience spans from predictive analytics in big data applications to creating intelligent categorization systems that enhance user experiences.',
      technologies: ['Python', 'MATLAB', 'SQL', 'Excel', 'Statistical Analysis']
    },
    {
      title: 'Software Engineering',
      description: 'Beyond just programming, I\'m an engineer who turns visions into robust, scalable solutions. I\'ve led teams of 5+ developers, managed rapid development cycles using Agile methodologies, and delivered MVPs ahead of schedule. My focus is on writing clean, efficient code that reduces system errors and improves performance.',
      technologies: ['Java', 'C', 'Python', 'Git', 'Agile/Scrum']
    },
    {
      title: 'System Integration & APIs',
      description: 'Connecting different systems and making them work harmoniously is where I excel. I\'ve developed and integrated RESTful APIs that improved system performance by 8% and facilitated seamless communication between complex internal systems. My work ensures that different technologies speak the same language.',
      technologies: ['REST APIs', 'Java', 'JavaScript', 'System Design']
    },
    {
      title: 'Teaching & Mentorship',
      description: 'Sharing knowledge and helping others grow is fundamental to who I am. As a Teaching Assistant for Data Structures and Algorithms, I guide students in mastering coding fundamentals. I believe in making complex concepts accessible and inspiring the next generation of developers.',
      technologies: ['Java', 'Algorithm Design', 'Mentoring', 'Technical Communication']
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <section className="container-custom fade-in">
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={service.title} className="col-lg-6 col-md-12">
              <div className="card h-100 hero-card">
                <div className="card-body p-4">
                <h4 className="card-title text-success fw-bold mb-3">{service.title}</h4>
                <p className="card-text text-white mb-3" style={{ lineHeight: '1.6' }}>
                  {service.description}
                </p>
                <div className="mt-3">
                  <h6 className="text-light mb-2">Technologies & Tools:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="badge bg-secondary text-light border-secondary px-3 py-2 rounded-pill"
                        style={{ fontSize: '0.8rem' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
       
      </section>
    </>
  );
}