import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaRocket, FaHeart } from 'react-icons/fa';
import './About.css';

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

  const features = [
    {
      icon: <FaCode />,
      title: 'Clean Code',
      description: 'I write clean, maintainable, and scalable code following best practices and design patterns.',
    },
    {
      icon: <FaRocket />,
      title: 'Fast Development',
      description: 'I deliver high-quality solutions quickly using modern frameworks and tools.',
    },
    {
      icon: <FaHeart />,
      title: 'Passionate',
      description: 'I love what I do and constantly strive to learn new technologies and improve my skills.',
    },
  ];

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
          <motion.div className="about-text" variants={itemVariants}>
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Full-Stack & Java Backend Developer
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Building scalable systems with Java and modern web apps using the MERN stack. Passionate about clean code, performance, and continuous learning. Always open to building impactful products and collaborating on exciting ideas.
            </motion.p>
          </motion.div>

          <motion.div className="about-features" variants={itemVariants}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                whileHover={{ scale: 1.05, y: -10 }}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

