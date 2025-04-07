import React from 'react';
import slowgradImage from '../assets/SLOWGRAD SANDTON.png';

function AboutPage() {
  return (
    <section id="about" className="about">
      <h2>About Stuqton Structural</h2>
      <div className="about-container">
        <div className="about-image">
          <img src={slowgradImage} alt="Stuqton Structural Office" className="about-project-image" />
        </div>
        <div className="about-content">
          <h3>Engineering Excellence Since 2014</h3>
          <p>Founded by a team of expert structural engineers and construction professionals, Stuqton Structural has established itself as a leading provider of innovative structural engineering solutions across Africa.</p>
          <p>Our mission is to deliver exceptional structural designs and construction services that combine safety, efficiency, and aesthetic appeal to create lasting infrastructure.</p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">9+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">300+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">80+</span>
              <span className="stat-label">Team Members</span>
            </div>
          </div>
          <a href="#contact" className="about-cta">Work With Us</a>
        </div>
      </div>
    </section>
  );
}

export default AboutPage; 