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

export default function Experience() {
  const experience = [
    {
      role: 'AI Lab Research Assistant',
      company: 'Virginia Commonwealth University',
      location: 'Richmond, VA',
      timeframe: 'August 2024 - December 2024',
      details: [
        'Developed advanced optimization algorithms and AI models for 5G/6G cellular communication systems, IoT/CPS systems, and distributed systems using Python and TensorFlow, improving network efficiency by 25%',
        'Designed and implemented machine learning models using Python and Scikit-learn for predictive analytics in big data applications, achieving a 90% accuracy rate'
      ]
    },
    {
      role: 'Software Engineering Intern',
      company: 'Bank of America',
      location: 'Pennington, NJ',
      timeframe: 'June 2024 - August 2024',
      details: [
        'Designed and developed multilingual internal automation tools for quality testing using proprietary JavaScript frameworks, saving up to 200 hours of manual testing annually',
        'Implemented cross-platform bug fixes and code adjustments, collaborating with multiple teams to ensure seamless integration, resulting in a 15% reduction in system errors',
        'Developed and integrated RESTful APIs using Java to facilitate seamless communication between internal systems, enhancing data exchange efficiency and improving system performance by 8%'
      ]
    },
    {
      role: 'Torch Developer',
      company: 'Showtime Strategies',
      location: 'Richmond, VA',
      timeframe: 'December 2023',
      details: [
        'Led a team of 5 developers in creating a full-stack web application for the startup TORCH, utilizing Node.js, SQL, and Flask, resulting in a functional MVP delivered ahead of schedule',
        'Transformed Figma designs into full-functioning web pages using Node.js, SQL, and Flask, ensuring a 100% match to design specifications and enhancing the user experience',
        'Managed a rapid development schedule using Agile methodologies to ensure quality, meeting all customer requirements and delivering the project 2 weeks before the deadline'
      ]
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <section className="container-custom fade-in">
        <h2 className="text-center fw-bold mb-5">Professional Experience</h2>
        <div className="row g-4">
          {experience.map((exp, index) => (
            <div key={exp.role} className="col-12">
              <div className="card hero-card mb-4">
                <div className="card-body">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                    <div>
                      <h4 className="card-title text-success fw-bold mb-1">{exp.role}</h4>
                      <h5 className="text-white mb-1">{exp.company}</h5>
                      <p className="text-light mb-0">{exp.location}</p>
                    </div>
                    <span className="badge bg-secondary text-light px-3 py-2 rounded-pill mt-2 mt-md-0">
                      {exp.timeframe}
                    </span>
                  </div>
                  <div className="mt-4">
                    {exp.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="d-flex align-items-start mb-3">
                        <div className="me-3 mt-1">
                          <div 
                            className="bg-success rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '8px', height: '8px', minWidth: '8px' }}
                          ></div>
                        </div>
                        <p className="text-white mb-0" style={{ lineHeight: '1.6' }}>
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Teaching Experience */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card hero-card">
              <div className="card-body">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                  <div>
                    <h4 className="card-title text-success fw-bold mb-1">Teaching Assistant</h4>
                    <h5 className="text-white mb-1">Virginia Commonwealth University</h5>
                    <p className="text-light mb-0">Richmond, VA</p>
                  </div>
                  <span className="badge bg-secondary text-light px-3 py-2 rounded-pill mt-2 mt-md-0">
                    December 2022 - May 2023
                  </span>
                </div>
                <div className="mt-4">
                  <div className="d-flex align-items-start">
                    <div className="me-3 mt-1">
                      <div 
                        className="bg-success rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '8px', height: '8px', minWidth: '8px' }}
                      ></div>
                    </div>
                    <p className="text-white mb-0" style={{ lineHeight: '1.6' }}>
                      Teaching Assistant for Data Structures and Algorithms (CMSC 256): Guided students in mastering coding fundamentals in Java, providing mentorship and technical support to enhance their programming skills and understanding of complex algorithms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}