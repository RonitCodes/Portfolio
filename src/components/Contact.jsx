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
  .contact-link {
    color: #28a745;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .contact-link:hover {
    color: #ffffff;
    text-decoration: underline;
  }
`;

export default function Contact() {
  const contactInfo = [
    {
      type: 'Email',
      value: 'ronitsharma.us',
      link: 'mailto:ronitsharma.us@gmail.com',
      icon: '📧'
    },
    {
      type: 'Phone',
      value: '(571) 345-6694',
      link: 'tel:+15713456694',
      icon: '📱'
    },
    {
      type: 'LinkedIn',
      value: 'Ronit Sharma',
      link: 'https://www.linkedin.com/in/ronit-sharma-269938232',
      icon: '💼'
    },
    {
      type: 'Portfolio',
      value: 'View My Work',
      link: 'https://64b9d5472a781a1cf03f337f--lively-lebkuchen-fdec98.netlify.app/',
      icon: '🌐'
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <section className="container-custom fade-in">
        <div className="text-center mb-5">
          
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card hero-card">
              <div className="card-body text-center p-5">
                <h3 className="text-success fw-bold mb-4">Let's Connect</h3>
                <p className="text-white mb-4">
                  Whether you're looking for a software engineer, AI researcher, or just want to chat about technology, 
                  I'm always open to new opportunities and conversations.
                </p>
                
                <div className="row g-4 mt-4">
                  {contactInfo.map((contact, index) => (
                    <div key={contact.type} className="col-md-6">
                      <div className="d-flex align-items-center justify-content-center mb-3">
                        <span className="me-3" style={{ fontSize: '1.5rem' }}>{contact.icon}</span>
                        <div className="text-start">
                          <h6 className="text-success mb-1 fw-bold">{contact.type}</h6>
                          <a 
                            href={contact.link}
                            className="contact-link"
                            target={contact.type === 'LinkedIn' || contact.type === 'Portfolio' ? '_blank' : '_self'}
                            rel={contact.type === 'LinkedIn' || contact.type === 'Portfolio' ? 'noopener noreferrer' : ''}
                          >
                            {contact.value}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-5 pt-4 border-top border-secondary">
                  <p className="text-light mb-3">
                    <strong>Located in:</strong> Charlotte, NC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="card bg-success text-white hero-card">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Ready to Work Together?</h4>
                <p className="mb-3">
                  I'm actively seeking full-time opportunities in software engineering, AI/ML, and data science. 
                  Let's discuss how I can contribute to your team!
                </p>
                <a 
                  href="mailto:ronitsharma.us@gmail.com"
                  className="btn btn-light btn-lg fw-bold"
                  style={{ color: '#28a745' }}
                >
                  Send Me an Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}