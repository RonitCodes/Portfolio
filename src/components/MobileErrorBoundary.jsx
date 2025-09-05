// src/components/MobileErrorBoundary.jsx

import React from 'react';
import { isMobile, isIOS } from '../utils/mobileDetection';
import { browserCompatibilityCheck } from '../utils/browserCompatibility';

class MobileErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorInfo: null,
      errorDetails: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Mobile Error:', error, errorInfo);
    
    // Gather additional debugging info
    const debugInfo = {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      isMobile: isMobile(),
      isIOS: isIOS(),
      compatibility: browserCompatibilityCheck(),
      timestamp: new Date().toISOString(),
      url: window.location.href,
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
    
    this.setState({
      errorInfo: errorInfo,
      errorDetails: debugInfo
    });

    // Log to console for debugging
    console.log('Full error details:', debugInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleReportError = () => {
    // You could send this to an error reporting service
    console.log('Error report:', this.state.errorDetails);
    
    // For now, just copy to clipboard if possible
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(this.state.errorDetails, null, 2));
      alert('Error details copied to clipboard');
    }
  };

  render() {
    if (this.state.hasError) {
      const isMobileDevice = isMobile();
      
      return (
        <div 
          className="error-boundary-container"
          style={{ 
            minHeight: '100vh', 
            backgroundColor: '#000', 
            color: '#28d740',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ 
              fontSize: isMobileDevice ? '1.5rem' : '2rem',
              marginBottom: '1rem',
              color: '#28d740'
            }}>
              {isMobileDevice ? 'Mobile Error Detected' : 'Something went wrong'}
            </h2>
            
            <p style={{ 
              fontSize: isMobileDevice ? '0.9rem' : '1rem',
              marginBottom: '1.5rem',
              color: '#ccc',
              lineHeight: '1.5'
            }}>
              {isMobileDevice 
                ? 'The app encountered an error on your mobile device. This might be due to browser compatibility issues.'
                : 'Please try refreshing the page. If the problem persists, try using a different browser.'
              }
            </p>

            {/* Error details for debugging (only show in development) */}
            {process.env.NODE_ENV === 'development' && this.state.errorDetails && (
              <details style={{ 
                marginBottom: '1rem', 
                textAlign: 'left',
                backgroundColor: '#1a1a1a',
                padding: '1rem',
                borderRadius: '5px',
                border: '1px solid #333'
              }}>
                <summary style={{ cursor: 'pointer', color: '#28d740' }}>
                  Error Details (Development)
                </summary>
                <pre style={{ 
                  fontSize: '0.8rem', 
                  overflow: 'auto',
                  color: '#fff',
                  margin: '0.5rem 0 0 0'
                }}>
                  {JSON.stringify(this.state.errorDetails, null, 2)}
                </pre>
              </details>
            )}

            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              flexDirection: isMobileDevice ? 'column' : 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <button 
                onClick={this.handleRefresh}
                style={{
                  background: '#28d740',
                  color: '#000',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: isMobileDevice ? '200px' : 'auto'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#22c73d';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#28d740';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🔄 Refresh Page
              </button>

              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={this.handleReportError}
                  style={{
                    background: 'transparent',
                    color: '#28d740',
                    border: '2px solid #28d740',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    minWidth: isMobileDevice ? '200px' : 'auto'
                  }}
                >
                  📋 Copy Error Details
                </button>
              )}
            </div>

            <div style={{ 
              marginTop: '2rem',
              fontSize: '0.8rem',
              color: '#666',
              borderTop: '1px solid #333',
              paddingTop: '1rem'
            }}>
              <p>User Agent: {navigator.userAgent}</p>
              <p>Screen: {window.innerWidth}x{window.innerHeight}</p>
              <p>Time: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MobileErrorBoundary;