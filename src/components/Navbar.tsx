import { useState, useEffect } from 'react';
import '../styles/navbar.css';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <nav>
      <div className="nav-logo">Musfiqur Rahman</div>

      <ul className="nav-links">
        <li><a onClick={() => scrollToSection('hero')}>Home</a></li>
        <li><a onClick={() => scrollToSection('about')}>About</a></li>
        <li><a onClick={() => scrollToSection('projects')}>Projects</a></li>
        <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
      </ul>

      <div className="nav-cta">
        <button className="nav-btn nav-btn-outline">Resume</button>
        <button className="nav-btn nav-btn-primary">Get in Touch</button>
      </div>

      <div
        className={`hamburger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};
