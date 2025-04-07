import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Stuqton Structural</h3>
          <p>Excellence in structural engineering since 2005</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>123 Engineering Avenue, Sandton</p>
          <p>Phone: (011) 123-4567</p>
          <p>Email: info@stuqton.com</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Stuqton Structural. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 