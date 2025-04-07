import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [fabActive, setFabActive] = useState(false);
  const mainRef = useRef(null);
  const fabRef = useRef(null);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [activeSection, setActiveSection] = useState('home');

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 767;
      setIsMobile(mobile);
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [menuOpen]);

  // Handle clicks outside menu to close it on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && 
          !e.target.closest('.navigation') && 
          !e.target.closest('.hamburger-menu')) {
        setMenuOpen(false);
      }
      
      // Also handle FAB click outside
      if (fabActive && 
          fabRef.current && 
          !fabRef.current.contains(e.target) && 
          !e.target.closest('.fab-options')) {
        setFabActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen, fabActive]);
  
  // Track when contact section is visible to hide bottom CTA
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setContactVisible(true);
            // Hide FAB when contact is visible
            setFabActive(false);
          } else {
            setContactVisible(false);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      observer.observe(contactSection);
    }
    
    return () => {
      if (contactSection) {
        observer.unobserve(contactSection);
      }
    };
  }, []);
  
  // Set CSS variable for full mobile height on resize and orientation change
  useEffect(() => {
    const setMobileHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setMobileHeight();
    window.addEventListener('resize', setMobileHeight);
    window.addEventListener('orientationchange', setMobileHeight);
    
    return () => {
      window.removeEventListener('resize', setMobileHeight);
      window.removeEventListener('orientationchange', setMobileHeight);
    };
  }, []);
  
  // Show back-to-top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active section based on current route or scroll position
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path) {
      setActiveSection(path);
    } else {
      // If on homepage, determine active section based on scroll position
      const handleScroll = () => {
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

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleFab = (e) => {
    e.stopPropagation();
    setFabActive(!fabActive);
  };
  
  const handleContactOption = (e, targetId) => {
    e.preventDefault();
    setFabActive(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Handle smooth scrolling for anchor links on the homepage
  const handleNavClick = (e, targetId) => {
    // Only apply smooth scrolling behavior on the homepage
    if (location.pathname === '/') {
      e.preventDefault();
      
      const element = document.getElementById(targetId);
      if (element) {
        // Add offset for header height - adjust for mobile if needed
        const offset = isMobile ? 70 : 80;
        
        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: 'smooth'
        });
        setActiveSection(targetId);
      }
    }
  };

  return (
    <div className={`layout ${contactVisible ? 'contact-visible' : ''}`}>
      <Header isMenuOpen={menuOpen} toggleMenu={toggleMenu} />
      <main className="page-transition" ref={mainRef}>
        <Outlet />
      </main>
      <Footer />
      
      {/* Mobile Quick Contact FAB */}
      {isMobile && (
        <>
          <div 
            className="mobile-fab" 
            onClick={toggleFab}
            ref={fabRef}
            aria-expanded={fabActive}
            aria-label="Quick Contact Options"
          ></div>
          
          <div className={`fab-options ${fabActive ? 'active' : ''}`}>
            <a 
              href="#contact" 
              className="fab-option"
              onClick={(e) => handleContactOption(e, 'contact')}
            >
              Get a Quote
            </a>
            <a 
              href="tel:+27111234567" 
              className="fab-option"
            >
              Call Us
            </a>
            <a 
              href="mailto:info@stuqton.com" 
              className="fab-option"
            >
              Email Us
            </a>
          </div>
        </>
      )}
      
      {/* Mobile Bottom Navigation Bar */}
      {isMobile && (
        <nav className="bottom-nav">
          <Link 
            to="/"
            className={activeSection === 'home' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'home')}
          >
            Home
          </Link>
          <Link 
            to="/about"
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            About
          </Link>
          <Link 
            to="/services"
            className={activeSection === 'services' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'services')}
          >
            Services
          </Link>
          <Link 
            to="/clients"
            className={activeSection === 'clients' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'clients')}
          >
            Clients
          </Link>
          <Link 
            to="/contact"
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Contact
          </Link>
        </nav>
      )}
      
      {/* Back to top button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

export default Layout; 