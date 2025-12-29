import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaRocket, FaHeart, FaGraduationCap, FaMapMarkerAlt, FaServer, FaLaptopCode, FaBrain } from 'react-icons/fa';
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
      icon: <FaLaptopCode />,
      title: 'Full-Stack Development',
      description: 'Building modern, responsive web applications with the MERN stack and Java Spring Boot—from APIs to intuitive user interfaces.',
    },
    {
      icon: <FaBrain />,
      title: 'AI/ML',
      description: 'Exploring machine learning and AI with PyTorch, LangChain, OpenAI, and Hugging Face to build intelligent applications.',
    },
    {
      icon: <FaServer />,
      title: 'System Design',
      description: 'Designing scalable, high-performance distributed systems with clean architecture and microservices patterns.',
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
              Hi, I'm <span className="highlight-name">Abhijeet Singh</span> 👋
            </motion.h3>
            <motion.p
              className="tagline"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Full-Stack Developer & AI/ML Enthusiast crafting scalable, intelligent applications.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I design and build <strong>high-performance backend systems</strong> using Java and develop modern,
              responsive web applications with the <strong>MERN stack</strong>. Currently exploring <strong>AI/ML</strong> with
              PyTorch, LangChain, and Hugging Face. I care deeply about clean architecture,
              optimized performance, and writing code that scales beyond prototypes.
            </motion.p>

            <motion.div
              className="about-details"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="detail-item">
                <FaGraduationCap className="detail-icon" />
                <span><strong>MCA</strong> @ KIET Deemed to be University, Ghaziabad (Delhi-NCR)</span>
              </div>
              <div className="detail-item">
                <FaGraduationCap className="detail-icon" />
                <span><strong>BCA</strong> @ SMS, Varanasi — Strong foundation in DSA & Software Development</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span>Originally from <strong>Varanasi, Uttar Pradesh</strong></span>
              </div>
            </motion.div>

            <motion.p
              className="cta-text"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              💼 <strong>Open to Opportunities:</strong> I'm actively seeking full-time roles and internships where I can contribute my skills in full-stack development and AI/ML. Let's connect and discuss how I can add value to your team!
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

