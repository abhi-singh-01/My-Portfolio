import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';
import { endpoints } from '../config/api';
import ecomplaintImage from '../assets/ecomplaint.webp';
import ecomplaintImage640 from '../assets/ecomplaint-640.webp';
import weatherImage from '../assets/weather.webp';
import weatherImage640 from '../assets/weather-640.webp';
import vaartaImage from '../assets/vaarta.webp';
import pastebinImage from '../assets/pastebin.webp';
import './Projects.css';

const CARD_IMAGE_SIZES = '(max-width: 768px) 100vw, 50vw';

const createResponsiveImage = (full, compact) => ({
  src: full,
  srcSet: `${compact} 640w, ${full} 1200w`,
  sizes: CARD_IMAGE_SIZES,
});

const projectImagesByTitle = {
  'E-Complaint': createResponsiveImage(ecomplaintImage, ecomplaintImage640),
  'Weather Forecast': createResponsiveImage(weatherImage, weatherImage640),
  Vaarta: { src: vaartaImage },
  'Pastebin Lite': { src: pastebinImage },
};

const resolveProjectImage = (project) => {
  if (project.image) {
    return typeof project.image === 'string'
      ? { src: project.image }
      : project.image;
  }

  return projectImagesByTitle[project.title] || null;
};

const ProjectPreviewImage = ({ image, title }) => {
  if (!image) {
    return (
      <div className="project-placeholder">
        <span>{title}</span>
      </div>
    );
  }

  const imageProps = typeof image === 'string' ? { src: image } : image;

  return (
    <img
      src={imageProps.src}
      srcSet={imageProps.srcSet}
      sizes={imageProps.sizes}
      alt={title}
      loading="lazy"
      decoding="async"
    />
  );
};

const personalizedLearningProject = {
  _id: '3',
  title: 'Personalized Learning System',
  description: 'An AI-powered learning management system that creates personalized study plans, adaptive quizzes, course materials, live classes, and analytics for learners, educators, and admins.',
  technologies: ['React', 'Node.js', 'MongoDB', 'Gemini AI', 'Tailwind CSS'],
  githubUrl: 'https://github.com/abhi-singh-01/Personalized_Learning_Platform',
  liveUrl: 'https://personalized-learning-platform-ochre.vercel.app',
  featured: true,
  image: 'https://personalized-learning-platform-ochre.vercel.app/educator-hero.png',
};

const pastebinProject = {
  _id: '4',
  title: 'Pastebin Lite',
  description: 'A short URL creator web application for quickly creating and sharing compact links with a clean, lightweight interface.',
  technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
  githubUrl: null,
  liveUrl: 'https://pastebin-weld.vercel.app/',
  featured: true,
  image: projectImagesByTitle['Pastebin Lite'],
};

// Move static data outside component to prevent recreation
const defaultProjects = [
  {
    _id: '0',
    title: 'E-Complaint',
    description: 'A digital complaint management system for streamlined issue tracking and resolution.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redis'],
    githubUrl: 'https://github.com/abhi-singh-01/E-Complaint',
    liveUrl: 'https://ecomplain01.vercel.app/',
    featured: true,
    image: projectImagesByTitle['E-Complaint'],
  },
  {
    _id: '1',
    title: 'Weather Forecast',
    description: 'A modern weather forecast application with real-time weather data, 5-day forecasts, and location-based search. Built with React frontend and Spring Boot backend, containerized with Docker.',
    technologies: ['React', 'Spring Boot', 'Docker', 'REST API'],
    githubUrl: 'https://github.com/abhi-singh-01/weather-app',
    liveUrl: 'https://weather-app-two-gamma-65.vercel.app/',
    featured: true,
    image: projectImagesByTitle['Weather Forecast'],
  },
  {
    _id: '2',
    title: 'Vaarta',
    description: 'A real-time chat application with modern features for seamless communication.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/abhi-singh-01/Vaartaa',
    liveUrl: null,
    featured: true,
    image: projectImagesByTitle.Vaarta,
  },
  personalizedLearningProject,
  pastebinProject,
];

const withPortfolioProjectUpdates = (projectList) => {
  const projectsWithUpdates = projectList.map((project) => {
    const isEComplaint = (
      project.title === 'E-Complaint' ||
      project.githubUrl === 'https://github.com/abhi-singh-01/E-Complaint'
    );

    const technologies = project.technologies || [];
    const hasRedis = technologies.some((tech) => tech.toLowerCase() === 'redis');
    const withRedis = isEComplaint && !hasRedis
      ? { ...project, technologies: [...technologies, 'Redis'] }
      : project;

    return {
      ...withRedis,
      image: resolveProjectImage(withRedis),
    };
  });

  return [personalizedLearningProject, pastebinProject].reduce((updatedProjects, staticProject) => {
    const hasStaticProject = updatedProjects.some((project) => (
      (staticProject.githubUrl && project.githubUrl === staticProject.githubUrl) ||
      (staticProject.liveUrl && project.liveUrl === staticProject.liveUrl) ||
      project.title === staticProject.title
    ));

    return hasStaticProject
      ? updatedProjects
      : [...updatedProjects, staticProject];
  }, projectsWithUpdates);
};

// Move animation variants outside component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const Projects = memo(() => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [projects, setProjects] = useState(defaultProjects);
  const [enableCardHover, setEnableCardHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateHover = () => setEnableCardHover(media.matches);

    updateHover();
    media.addEventListener('change', updateHover);

    return () => media.removeEventListener('change', updateHover);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const response = await axios.get(endpoints.projects, {
          signal: controller.signal
        });
        // Only use API data if it has projects, otherwise keep defaults
        if (response.data && response.data.length > 0) {
          setProjects(withPortfolioProjectUpdates(response.data));
        }
      } catch (error) {
        // Keep default projects on error
        console.log('Using default projects');
      }
    };

    fetchProjects();

    // Cleanup: abort request on unmount
    return () => controller.abort();
  }, []);

  return (
    <section id="projects" className="projects section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={enableCardHover ? { scale: 1.03, y: -6 } : undefined}
            >
              <div className="project-image">
                <ProjectPreviewImage image={project.image} title={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`View ${project.title} source code on GitHub`}
                        title="View Code"
                      >
                        <FaGithub />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`Open ${project.title} live demo`}
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-stack">
                  <span className="project-stack-label">Used Stack</span>
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;


