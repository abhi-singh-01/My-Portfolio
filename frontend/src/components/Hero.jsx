import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ReactTyped } from 'react-typed';
import heroImage from '../assets/heroImage.png';
import './Hero.css';

// Move animation variants outside component to prevent recreation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const floatAnimation = {
  y: [0, -20, 0],
};

const floatTransition = {
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut",
};

const scrollAnimation = {
  y: [0, 10, 0],
};

const scrollTransition = {
  duration: 1.5,
  repeat: Infinity,
  ease: "easeInOut",
};

const Hero = memo(() => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.h2
              className="hero-greeting"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I'm
            </motion.h2>
            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Abhijeet Singh
            </motion.h1>
            <motion.div
              className="hero-typed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ReactTyped
                strings={[
                  'MERN Stack Developer',
                  'Java Developer',
                  'Problem Solver',
                ]}
                typeSpeed={50}
                backSpeed={30}
                loop
              />
            </motion.div>
            <motion.p
              className="hero-description"
              variants={itemVariants}
            >
              A developer focused on building modern, user-centric web applications with elegant, scalable solutions.
            </motion.p>

            <motion.div
              className="hero-buttons"
              variants={itemVariants}
            >
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiMail /> Hire Me
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiDownload /> Download Resume
              </motion.a>
            </motion.div>

            <motion.div
              className="hero-social"
              variants={itemVariants}
            >
              <motion.a
                href="https://github.com/abhi-singh-01"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/abhijeetsingh16/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://x.com/MrabhiRajput1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="image-wrapper"
              animate={floatAnimation}
              transition={floatTransition}
            >
              <div className="gradient-orbit orbit-1"></div>
              <div className="gradient-orbit orbit-2"></div>
              <div className="gradient-orbit orbit-3"></div>
              <div className="profile-image">
                <img
                  src={heroImage}
                  alt="Abhijeet Singh"
                  className="hero-photo"
                  loading="eager"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={scrollAnimation}
          transition={scrollTransition}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;


