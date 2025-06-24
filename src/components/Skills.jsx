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

export default function Skills() {
const categories = [
    { 
      title: 'Frontend', 
      items: ['HTML', 'CSS', 'JavaScript', 'React'] 
    },
    { 
      title: 'Backend', 
      items: ['Node.js', 'Flask', 'Django', 'Java', 'Python', 'SQL'] 
    },
    { 
      title: 'AI & Machine Learning', 
      items: ['TensorFlow', 'Keras', 'PyTorch', 'Scikit-learn', 'Neural Networks'] 
    },
    { 
      title: 'Development Tools', 
      items: ['Git', 'AWS', 'Figma', 'Excel', 'Agile/Scrum'] 
    }
  ];
  return (
    <>
      <style>{styles}</style>
      <section className="container-custom fade-in">
        <div className="row g-4">
          {categories.map(cat => (
            <div key={cat.title} className="col-md-6">
              <div className="card hero-card">
                <div className="card-body">
                <h5 className="card-title text-success fw-bold">{cat.title}</h5>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  {cat.items.map(item => (
                    <span 
                      key={item} 
                      className="badge bg-secondary text-light px-3 py-2 rounded-pill"
                      style={{ fontSize: '0.85rem' }}
                    >
                      {item}
                    </span>
                  ))}
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