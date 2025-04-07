import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Struqton Structures.png';

function Header({ isMenuOpen, toggleMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const location = useLocation();

  // Detect if device is touch-capable
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => {
      window.removeEventListener('resize', checkTouchDevice);
    };
  }, []);

  // Set active section based on current route
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path) {
      setActiveSection(path);
    } else {
      // If on homepage, determine active section based on scroll position
      const handleScroll = () => {
        // Update header style on scroll
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        // Only determine active section if we're on the homepage
        if (location.pathname === '/') {
          const sections = ['home', 'about', 'services', 'clients', 'contact'];
          
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              const offset = 100; // Adjust based on header height
              
              if (rect.top <= offset && rect.bottom >= offset) {
                setActiveSection(section);
                break;
              }
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [location]);

  // Handle smooth scrolling for anchor links on the homepage
  const handleNavClick = useCallback((e, targetId) => {
    // Only apply smooth scrolling behavior on the homepage
    if (location.pathname === '/') {
      e.preventDefault();
      
      // Close mobile menu if open
      if (isMenuOpen) {
        toggleMenu();
      }
      
      const element = document.getElementById(targetId);
      if (element) {
        // Add offset for header height - adjust for mobile if needed
        const isMobile = window.innerWidth <= 768;
        const offset = isMobile ? 70 : 80;
        
        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: 'smooth'
        });
        setActiveSection(targetId);
      }
    } else {
      // If not on homepage, close the menu
      if (isMenuOpen) {
        toggleMenu();
      }
    }
  }, [isMenuOpen, toggleMenu, location.pathname]);

  // Handle close button click in mobile menu
  const handleCloseMenu = useCallback((e) => {
    e.stopPropagation();
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [isMenuOpen, toggleMenu]);
  
  // Handle mobile menu CTA click
  const handleMenuCTA = useCallback(() => {
    if (isMenuOpen) {
      toggleMenu();
      
      // If on homepage, scroll to contact section
      if (location.pathname === '/') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          setTimeout(() => {
            window.scrollTo({
              top: contactSection.offsetTop - 70,
              behavior: 'smooth'
            });
            setActiveSection('contact');
          }, 300); // Delay to allow menu close animation
        }
      }
    }
  }, [isMenuOpen, toggleMenu, location.pathname]);
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, 'home')}
            aria-label="Stuqton Structural Logo, go to home page"
          >
            <img src={logo} alt="Stuqton Structural Logo" />
          </Link>
        </div>
        
        <div className="mobile-menu-wrapper">
          <button 
            className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        
        <nav 
          className={`navigation ${isMenuOpen ? 'active' : ''}`} 
          id="main-navigation"
        >
          <ul>
            <li style={{"--item-index": 0}}>
              <Link
                to="/"
                className={activeSection === 'home' ? 'active' : ''} 
                onClick={(e) => handleNavClick(e, 'home')}
              >
                Home
              </Link>
            </li>
            <li style={{"--item-index": 1}}>
              <Link
                to="/about"
                className={activeSection === 'about' ? 'active' : ''} 
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About
              </Link>
            </li>
            <li style={{"--item-index": 2}}>
              <Link
                to="/services"
                className={activeSection === 'services' ? 'active' : ''} 
                onClick={(e) => handleNavClick(e, 'services')}
              >
                Services
              </Link>
            </li>
            <li style={{"--item-index": 3}}>
              <Link
                to="/clients"
                className={activeSection === 'clients' ? 'active' : ''} 
                onClick={(e) => handleNavClick(e, 'clients')}
              >
                Clients
              </Link>
            </li>
            <li style={{"--item-index": 4}}>
              <Link
                to="/contact"
                className={activeSection === 'contact' ? 'active' : ''} 
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header; 