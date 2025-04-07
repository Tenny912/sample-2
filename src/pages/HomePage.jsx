import React, { useEffect } from 'react';
import logo from '../assets/Struqton Structures.png';
import slowgradImage from '../assets/SLOWGRAD SANDTON.png';

function HomePage() {
  // Effect to handle the logo intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const logoIntro = document.querySelector('.logo-intro');
      if (logoIntro) {
        logoIntro.classList.add('completed');
      }
    }, 3000); // Logo animation completes after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="logo-intro">
        <div className="logo-intro-container">
          <img src={logo} alt="Stuqton Structural Logo" className="intro-logo" />
          <div className="logo-intro-text">
            <h1>Stuqton Structural</h1>
            <p>Building the Future</p>
          </div>
          <div className="logo-tagline">Excellence in Structural Engineering Since 2014</div>
          <div className="loading-bar"></div>
        </div>
      </section>

      <section className="hero" style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(26, 54, 93, 0.8) 100%), url(${slowgradImage})` }}>
        <div className="hero-content">
          <h2>Excellence in Structural Engineering</h2>
          <p>Stuqton Structural delivers innovative solutions and quality construction services</p>
          <a href="#contact" className="cta-button"><span>Get a Quote</span></a>
        </div>
      </section>
    </>
  );
}

export default HomePage; 