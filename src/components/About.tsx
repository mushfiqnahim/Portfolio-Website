import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
            end: 'top center',
            scrub: 1,
          },
        }
      );

      const skillTags = document.querySelectorAll('.skill-tag');
      skillTags.forEach((tag, index) => {
        gsap.fromTo(
          tag,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center+=100',
            },
            delay: index * 0.05,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container" ref={contentRef}>
        <div className="about-content">
          <h2>About Me</h2>
          <p className="about-text">
            I'm a fresh Computer Science graduate from BRAC University with a strong passion for Artificial Intelligence
            and Machine Learning. Throughout my academic journey, I've built practical AI systems that go beyond
            theoretical knowledge—from developing a novel Quad-Head CNN achieving 97% accuracy in disease detection to
            creating an AI-powered eye-tracking assistive technology system.
          </p>
          <p className="about-text">
            My strength lies in combining deep ML/DL foundations with practical software engineering skills. I'm
            comfortable working across the full stack—from data preprocessing and model architecture design to
            deployment and client communication. I'm particularly interested in computer vision, NLP, and building
            AI solutions that solve real-world problems.
          </p>

          <div className="skills-section">
            <h3>Technical Skills</h3>

            <div className="skill-category">
              <div className="skill-category-title">Languages</div>
              <div className="skill-tags">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">PHP</span>
                <span className="skill-tag">HTML</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-category-title">ML/DL Frameworks</div>
              <div className="skill-tags">
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">Keras</span>
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">Scikit-learn</span>
                <span className="skill-tag">OpenCV</span>
                <span className="skill-tag">NLTK</span>
                <span className="skill-tag">HuggingFace Transformers</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-category-title">Domains & Tools</div>
              <div className="skill-tags">
                <span className="skill-tag">Machine Learning</span>
                <span className="skill-tag">Deep Learning</span>
                <span className="skill-tag">Computer Vision</span>
                <span className="skill-tag">NLP</span>
                <span className="skill-tag">LLMs</span>
                <span className="skill-tag">Git/GitHub</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">Jupyter</span>
              </div>
            </div>

            <div className="skill-category">
              <div className="skill-category-title">Languages Spoken</div>
              <div className="skill-tags">
                <span className="skill-tag">Bengali (Fluent)</span>
                <span className="skill-tag">English (Proficient)</span>
                <span className="skill-tag">Hindi (Proficient)</span>
                <span className="skill-tag">Chinese (Intermediate)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-achievements">
          <h3>Key Achievements</h3>

          <div className="achievement-item">
            <div className="achievement-icon">🎓</div>
            <div className="achievement-text">
              <strong>SSC & HSC Excellence:</strong> Achieved perfect 5.00/5.00 GPA in Secondary and 4.00/5.00 in
              Higher Secondary education, demonstrating strong academic foundation
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">🧠</div>
            <div className="achievement-text">
              <strong>Novel ML Research:</strong> Designed a custom Quad-Head CNN architecture achieving 97% accuracy
              on disease classification from scratch-collected datasets
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">👁️</div>
            <div className="achievement-text">
              <strong>End-to-End AI Product:</strong> Built a fully functional AI-powered eye-tracking mouse using
              computer vision and MediaPipe for real-time gaze estimation
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">🌐</div>
            <div className="achievement-text">
              <strong>Multilingual:</strong> Fluent in Bengali, proficient in English and Hindi, intermediate Chinese
              speaker
            </div>
          </div>

          <div className="achievement-item">
            <div className="achievement-icon">🚀</div>
            <div className="achievement-text">
              <strong>Production-Ready Developer:</strong> Experience building systems beyond notebook-level
              experiments, including QA testing, client communication, and cross-functional collaboration
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
