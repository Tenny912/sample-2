import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ServicesPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleService = (index) => {
    if (isMobile) {
      setActiveService(activeService === index ? null : index);
    }
  };

  // Services array is kept for potential future use but won't be displayed
  const services = [
    {
      title: "Structural Engineering",
      description: "Our structural engineering services ensure buildings and structures can withstand all forces they may encounter during their lifetime. We provide comprehensive analysis, design, and documentation for buildings of all types and scales.",
      details: "We specialize in concrete, steel, masonry, and timber structures. Our team uses advanced analytical tools and modeling software to deliver efficient, economical designs that meet all code requirements and client expectations."
    },
    {
      title: "Construction Management",
      description: "We offer end-to-end construction management services to ensure your project is delivered on time, within budget, and to the highest quality standards.",
      details: "Our construction management approach includes project planning, cost management, quality control, site supervision, progress tracking, and stakeholder communication. We act as your representative on site, protecting your interests throughout the construction process."
    },
    {
      title: "Renovation & Retrofitting",
      description: "Our team specializes in the structural renovation and retrofitting of existing buildings to improve functionality, increase safety, and extend building lifespan.",
      details: "Services include structural assessment of existing buildings, strengthening designs, seismic retrofitting, repurposing of spaces, and implementation of sustainable upgrades. We work carefully to maintain the integrity and character of the original structure while improving its performance."
    },
    {
      title: "Architectural Design",
      description: "We provide architectural design services that balance aesthetics with functionality, creating spaces that inspire while meeting practical needs.",
      details: "Our architectural process begins with understanding your vision and requirements, followed by concept development, space planning, material selection, and detailed design. We collaborate closely with our structural team to ensure seamless integration of design and engineering elements."
    },
    {
      title: "Project Consulting",
      description: "We offer expert consulting services throughout all phases of your construction project, helping to navigate challenges and identify opportunities.",
      details: "Our consulting services include feasibility studies, due diligence reports, value engineering, peer reviews, expert witness testimony, and specialized problem-solving. We bring our extensive experience to help optimize your project outcomes."
    },
    {
      title: "Building Information Modeling",
      description: "We utilize advanced BIM technology to create comprehensive digital representations of your building's physical and functional characteristics.",
      details: "Our BIM services facilitate better collaboration, improved visualization, clash detection, cost estimation, and facility management. This technology-driven approach results in fewer errors, reduced costs, and more efficient project delivery."
    }
  ];

  return (
    <section className="services-page">
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Quality construction solutions for all your needs</p>
      </div>
      
      <div className="company-philosophy">
        <div className="philosophy-section">
          <h2>Our Philosophy</h2>
          <p>Our mission is to design, build and deliver innovatively Structured and competitively priced projects.</p>
        </div>
        
        <div className="philosophy-section">
          <h2>Our Vision</h2>
          <p>To become a preferred world class Construction Company.</p>
        </div>
        
        <div className="philosophy-section">
          <h2>Our Core Values</h2>
          <ul className="core-values">
            <li>Professionalism</li>
            <li>Efficiency</li>
            <li>Timeliness</li>
            <li>Transparency</li>
            <li>Integrity</li>
          </ul>
        </div>
      </div>
      
      <div className="service-process">
        <h2>Our Construction Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Consultation</h3>
            <p>We begin with a detailed consultation to understand your vision, requirements, and budget.</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Planning & Design</h3>
            <p>Our team creates comprehensive plans and designs that align with your goals.</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Construction</h3>
            <p>We execute the project with precision, quality materials, and skilled craftsmanship.</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Completion & Review</h3>
            <p>Final inspections ensure everything meets our high standards before handover.</p>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h2>Ready to Start Your Project?</h2>
        <p>Contact us today for a free consultation and estimate.</p>
        <Link to="/contact" className="cta-button">Get in Touch</Link>
      </div>
    </section>
  );
}

export default ServicesPage; 