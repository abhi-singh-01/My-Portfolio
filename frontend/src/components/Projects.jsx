import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';
import { endpoints } from '../config/api';
import './Projects.css';

// Move static data outside component to prevent recreation
const defaultProjects = [
  {
    _id: '0',
    title: 'Vaarta',
    description: 'A real-time chat application with modern features for seamless communication.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/abhi-singh-01/Vaartaa',
    liveUrl: 'https://github.com/abhi-singh-01/Vaartaa',
    featured: true,
    image: '',
  },
  {
    _id: '1',
    title: 'E-Complaint',
    description: 'A digital complaint management system for streamlined issue tracking and resolution.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/abhi-singh-01/E-Complaint',
    liveUrl: 'https://ecomplain01.vercel.app/',
    featured: true,
    image: '',
  },
];

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

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const response = await axios.get(endpoints.projects, {
          signal: controller.signal
        });
        // Only use API data if it has projects, otherwise keep defaults
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
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
          initial={{ opacity: 0, y: -50 }}
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
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} loading="lazy" />
                ) : (
                  <div className="project-placeholder">
                    <span>{project.title}</span>
                  </div>
                )}
                <div className="project-overlay">
                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
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


