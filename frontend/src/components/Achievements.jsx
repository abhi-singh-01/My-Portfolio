import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaAws, FaJava, FaDatabase } from 'react-icons/fa';
import { SiHackerrank } from 'react-icons/si';
import './Achievements.css';

const achievements = [
  {
    title: 'Cloud Practitioner',
    issuer: 'AWS Certified',
    icon: FaAws,
    gradient: 'linear-gradient(135deg, #ff9900, #ffcf6b)',
  },
  {
    title: 'Academy Graduate',
    issuer: 'AWS Academy',
    icon: FaAws,
    gradient: 'linear-gradient(135deg, #2563eb, #60a5fa)',
  },
  {
    title: 'Java Basic',
    issuer: 'HackerRank',
    icon: FaJava,
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
  },
  {
    title: 'SQL Basic',
    issuer: 'HackerRank',
    icon: FaDatabase,
    gradient: 'linear-gradient(135deg, #10b981, #22d3ee)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, rotateX: -12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.65,
      ease: 'easeOut',
    },
  },
};

const Achievements = memo(() => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="achievements" className="achievements section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Achievements
        </motion.h2>

        <motion.div
          className="achievements-stage"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="achievement-orbit orbit-one"></div>
          <div className="achievement-orbit orbit-two"></div>

          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const isHackerRank = achievement.issuer === 'HackerRank';

            return (
              <motion.article
                key={`${achievement.issuer}-${achievement.title}`}
                className="achievement-card"
                variants={cardVariants}
                whileHover={{ y: -12, rotate: index % 2 === 0 ? 1.5 : -1.5 }}
              >
                <div className="achievement-glow" style={{ background: achievement.gradient }}></div>
                <div className="achievement-icon" style={{ background: achievement.gradient }}>
                  {isHackerRank ? <SiHackerrank /> : <Icon />}
                </div>
                <div>
                  <span className="achievement-issuer">{achievement.issuer}</span>
                  <h3>{achievement.title}</h3>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

Achievements.displayName = 'Achievements';

export default Achievements;
