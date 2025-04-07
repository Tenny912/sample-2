import React from 'react';
import bancAbcLogo from '../assets/BANC ABC.png';
import unicefLogo from '../assets/UNICEF.png';
import zpcLogo from '../assets/ZPC.png';

function ClientsPage() {
  return (
    <section id="clients" className="clients">
      <h2>Trusted By Industry Leaders</h2>
      <p className="clients-intro">We're proud to work with leading organizations across various sectors.</p>
      
      <h3 className="slideshow-title">Our Valued Clients</h3>
      <div className="clients-grid">
        <div className="client-logo">
          <img src={bancAbcLogo} alt="BANC ABC" className="client-logo-img" />
        </div>
        <div className="client-logo">
          <img src={unicefLogo} alt="UNICEF" className="client-logo-img" />
        </div>
        <div className="client-logo">
          <img src={zpcLogo} alt="ZPC" className="client-logo-img" />
        </div>
      </div>
      
      <div className="testimonial">
        <blockquote>
          "Stuqton Structural delivered our project on time and under budget. Their attention to detail and commitment to quality is unmatched in the industry."
        </blockquote>
        <div className="testimonial-author">
          <div className="author-info">
            <h4>John Davidson</h4>
            <p>Project Manager, BANC ABC</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsPage; 