import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ThreeCharacter } from './ThreeCharacter';
import '../styles/hero.css';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const three3dRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        three3dRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 0.5,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={containerRef}>
      <div className="hero-content" ref={contentRef}>
        <h1>Hi, I'm Musfiqur Rahman</h1>
        <p className="hero-subtitle">Aspiring AI/ML Engineer & Full-Stack Developer</p>
        <p className="hero-description">
          Fresh Computer Science graduate from BRAC University with hands-on experience building AI/ML
          systems for real-world problems. I'm passionate about computer vision, deep learning, and creating
          elegant solutions that make a difference.
        </p>

        <div className="hero-cta">
          <button className="btn btn-primary">View My Work</button>
          <button className="btn btn-secondary" onClick={scrollToContact}>
            Get in Touch
          </button>
        </div>

        <div className="social-links">
          <a
            href="https://github.com/mushfiqnahim"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="GitHub"
          >
            ⚙️
          </a>
          <a
            href="https://linkedin.com/in/musfiqurnahim"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title="LinkedIn"
          >
            💼
          </a>
          <a
            href="mailto:mushfiqnahim99@gmail.com"
            className="social-link"
            title="Email"
          >
            ✉️
          </a>
        </div>
      </div>

      <div className="hero-3d-container" ref={three3dRef}>
        <ThreeCharacter containerRef={three3dRef} />
      </div>
    </section>
  );
};
