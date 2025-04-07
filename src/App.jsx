import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

// Import Layout
import Layout from './layouts/Layout';

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';

function App() {
  // Handle mobile viewport height issues
  useEffect(() => {
    // Check if device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
      // Add iOS specific class
      document.documentElement.classList.add('ios-device');
      
      // Fix for iOS full height
      const fixHeight = () => {
        document.documentElement.style.setProperty(
          '--window-inner-height', 
          `${window.innerHeight}px`
        );
      };
      
      window.addEventListener('resize', fixHeight);
      window.addEventListener('orientationchange', () => {
        // Delay to ensure the orientation change is complete
        setTimeout(fixHeight, 100);
      });
      
      // Initial call
      fixHeight();
      
      return () => {
        window.removeEventListener('resize', fixHeight);
        window.removeEventListener('orientationchange', fixHeight);
      };
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home page that displays all sections */}
          <Route index element={
            <div className="landing-page-content">
              <div id="home"><HomePage /></div>
              <div id="about"><AboutPage /></div>
              <div id="services"><ServicesPage /></div>
              <div id="clients"><ClientsPage /></div>
              <div id="contact"><ContactPage /></div>
            </div>
          } />
          
          {/* Individual page routes */}
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="contact" element={<ContactPage />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
