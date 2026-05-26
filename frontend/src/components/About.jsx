import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBrain, FaCode, FaGraduationCap, FaLaptopCode, FaMapMarkerAlt, FaRocket, FaServer } from 'react-icons/fa';
import './About.css';

const focusCards = [
  {
    icon: <FaLaptopCode />,
    title: 'Full Stack',
    label: 'React + Node',
  },
  {
    icon: <FaServer />,
    title: 'Backend',
    label: 'Java + Spring',
  },
  {
    icon: <FaBrain />,
    title: 'AI Builds',
    label: 'Gemini + ML',
  },
];

const quickFacts = [
  { icon: <FaGraduationCap />, value: 'MCA', label: 'KIET Ghaziabad' },
  { icon: <FaCode />, value: 'BCA', label: 'SMS Varanasi' },
  { icon: <FaMapMarkerAlt />, value: 'Varanasi', label: 'Uttar Pradesh' },
  { icon: <FaRocket />, value: 'Open', label: 'Full-time / Internship' },
];

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="about-hero-card" variants={itemVariants}>
            <div className="about-orbit orbit-a"></div>
            <div className="about-orbit orbit-b"></div>
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Abhijeet <span className="highlight-name">Singh</span>
            </motion.h3>
            <motion.p
              className="tagline"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Full-Stack Developer building clean web apps, backend systems, and AI features.
            </motion.p>
            <div className="about-stack">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>React</span>
              <span>AI</span>
            </div>
          </motion.div>

          <motion.div className="about-features" variants={itemVariants}>
            {focusCards.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                whileHover={{ scale: 1.05, y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="about-facts" variants={itemVariants}>
            {quickFacts.map((fact, index) => (
              <motion.div
                key={`${fact.value}-${fact.label}`}
                className="fact-card"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.5 + index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="fact-icon">{fact.icon}</div>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

