import React, { useEffect, useRef } from 'react';

function ContactPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize Leaflet map
    const initMap = () => {
      // Make sure Leaflet is available
      if (!window.L) return;

      // Create a map instance if it doesn't exist yet
      if (!mapRef.current._leaflet_id) {
        // Harare, Zimbabwe coordinates
        const harare = [-17.8252, 31.0335];
        
        // Create a map centered on Harare
        const map = window.L.map(mapRef.current).setView(harare, 14);
        
        // Add OpenStreetMap tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);
        
        // Add a marker for the office location
        const officeLocation = [-17.8213, 31.0453]; // Longcheng Plaza approximate location
        const marker = window.L.marker(officeLocation).addTo(map);
        
        // Add popup info for the marker
        marker.bindPopup(`
          <div class="info-window">
            <h3>Stuqton Structural</h3>
            <p>Shop 120-123, Longcheng Plaza</p>
            <p>Mutley Bend, Belvedere</p>
            <p>Harare, Zimbabwe</p>
          </div>
        `).openPopup();
      }
    };

    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      document.head.appendChild(script);
      
      script.onload = () => {
        initMap();
      };
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initMap();
    }
  }, []);

  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" placeholder="Your Phone Number" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Tell us about your project"></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
        <div className="contact-info">
          <h3>Our Harare Office</h3>
          <p>Shop 120-123, Longcheng Plaza</p>
          <p>Mutley Bend, Belvedere</p>
          <p>Harare, Zimbabwe</p>
          <p>Phone: +263 774 751 861 / +263 242 711 599</p>
          <p>Email: info@struqtonstructural.com</p>
          <h3>Hours</h3>
          <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
          <p>Saturday: 9:00 AM - 12:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
      
      {/* Harare Interactive Map */}
      <div className="contact-map">
        <div ref={mapRef} className="harare-map"></div>
      </div>
    </section>
  );
}

export default ContactPage; 