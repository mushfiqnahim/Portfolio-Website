import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Quad-Head CNN for Poultry Disease Detection',
    description:
      'Designed and implemented a novel Quad-Head CNN architecture to classify poultry diseases from fecal images. Collected and curated raw dataset from scratch, performed end-to-end data preprocessing, augmentation, and achieved 97% accuracy.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Deep Learning'],
    github: 'https://github.com/mushfiqnahim',
  },
  {
    id: 2,
    title: 'AI-Powered Eye-Tracking Mouse',
    description:
      'Developed a fully functional assistive technology system replacing a traditional mouse using real-time eye-gaze tracking via webcam. Implemented facial landmark detection and gaze estimation pipeline with low-latency cursor control.',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
    github: 'https://github.com/mushfiqnahim',
  },
  {
    id: 3,
    title: 'NLP & LLM-Based AI Automation',
    description:
      'Built AI automation pipelines leveraging LLMs and NLP for text classification, summarization, and information extraction. Applied transformer-based architectures and prompt engineering for practical real-world NLP use cases.',
    technologies: ['Python', 'HuggingFace', 'Transformers', 'NLP', 'LLMs'],
    github: 'https://github.com/mushfiqnahim',
  },
];

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.project-card');

      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center+=100',
            },
            delay: index * 0.15,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <h2>Featured Projects</h2>
      <div className="projects-grid" ref={cardsRef}>
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
            </div>
            <div className="project-content">
              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-footer">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link primary">
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
