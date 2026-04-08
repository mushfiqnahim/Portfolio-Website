import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center+=100',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = 'New Message from Portfolio';
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:mushfiqnahim99@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div ref={contentRef}>
        <h2>Let's Connect</h2>
        <p className="contact-subtitle">
          I'm always interested in hearing about new projects and opportunities. Whether you want to collaborate,
          have a question, or just want to say hi—feel free to reach out!
        </p>

        <div className="contact-content">
          <div className="contact-item">
            <div className="contact-icon">✉️</div>
            <div className="contact-label">Email</div>
            <a href="mailto:mushfiqnahim99@gmail.com" className="contact-value">
              mushfiqnahim99@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <div className="contact-icon">💼</div>
            <div className="contact-label">LinkedIn</div>
            <a href="https://linkedin.com/in/musfiqurnahim" target="_blank" rel="noopener noreferrer" className="contact-value">
              linkedin.com/in/musfiqurnahim
            </a>
          </div>

          <div className="contact-item">
            <div className="contact-icon">⚙️</div>
            <div className="contact-label">GitHub</div>
            <a href="https://github.com/mushfiqnahim" target="_blank" rel="noopener noreferrer" className="contact-value">
              github.com/mushfiqnahim
            </a>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📱</div>
            <div className="contact-label">Phone</div>
            <a href="tel:+8801915370934" className="contact-value">
              +880 1915-370934
            </a>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div className="contact-label">Location</div>
            <div className="contact-value">Dhaka, Bangladesh</div>
          </div>
        </div>

        <div className="contact-cta">
          <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>Send Me a Message</h3>
          <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            Designed & Built with React • TypeScript • GSAP • Three.js • WebGL
          </p>
          <div className="footer-links">
            <a href="https://github.com/mushfiqnahim" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/musfiqurnahim" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:mushfiqnahim99@gmail.com">Email</a>
          </div>
          <p className="footer-text">© 2024 Musfiqur Rahman. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
};
