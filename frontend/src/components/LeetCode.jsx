import React, { useState, useEffect, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaTrophy, FaStar, FaChartLine } from 'react-icons/fa';
import { endpoints } from '../config/api';
import './LeetCode.css';

// Move animation variants outside component to prevent recreation
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

// Move constants outside component
const LEETCODE_USERNAME = 'abhijeetsingh16';

const LeetCode = memo(() => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [leetcodeStats, setLeetcodeStats] = useState({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    ranking: 0,
    loading: true,
  });

  // Fetch real LeetCode stats via backend proxy
  useEffect(() => {
    const controller = new AbortController();

    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch(
          endpoints.leetcode(LEETCODE_USERNAME),
          { signal: controller.signal }
        );
        const data = await response.json();

        if (data.data && data.data.matchedUser) {
          const submitStats = data.data.matchedUser.submitStats.acSubmissionNum;
          const allQuestions = data.data.allQuestionsCount;
          const ranking = data.data.matchedUser.profile.ranking;

          const getCount = (arr, difficulty) => {
            const item = arr.find((s) => s.difficulty === difficulty);
            return item ? item.count : 0;
          };

          setLeetcodeStats({
            totalSolved: getCount(submitStats, 'All'),
            easySolved: getCount(submitStats, 'Easy'),
            mediumSolved: getCount(submitStats, 'Medium'),
            hardSolved: getCount(submitStats, 'Hard'),
            easyTotal: getCount(allQuestions, 'Easy'),
            mediumTotal: getCount(allQuestions, 'Medium'),
            hardTotal: getCount(allQuestions, 'Hard'),
            acceptanceRate: Math.round(
              (getCount(submitStats, 'All') /
                (getCount(allQuestions, 'Easy') +
                  getCount(allQuestions, 'Medium') +
                  getCount(allQuestions, 'Hard'))) *
              100
            ),
            ranking: ranking || 0,
            loading: false,
          });
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching LeetCode stats:', error);
          setLeetcodeStats((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    fetchLeetCodeStats();

    // Cleanup: abort request on unmount
    return () => controller.abort();
  }, []);

  // Memoize stats array to prevent recreation
  const stats = useMemo(() => [
    {
      icon: <FaCode />,
      label: 'Total Solved',
      value: leetcodeStats.totalSolved,
      color: '#6366f1',
    },
    {
      icon: <FaTrophy />,
      label: 'Ranking',
      value: `#${leetcodeStats.ranking.toLocaleString()}`,
      color: '#f59e0b',
    },
    {
      icon: <FaChartLine />,
      label: 'Problems Completed',
      value: `${leetcodeStats.acceptanceRate || 0}%`,
      color: '#10b981',
    },
  ], [leetcodeStats.totalSolved, leetcodeStats.ranking, leetcodeStats.acceptanceRate]);

  // Memoize difficulty stats
  const difficultyStats = useMemo(() => [
    { label: 'Easy', solved: leetcodeStats.easySolved, total: leetcodeStats.easyTotal || 1, color: '#10b981' },
    { label: 'Medium', solved: leetcodeStats.mediumSolved, total: leetcodeStats.mediumTotal || 1, color: '#f59e0b' },
    { label: 'Hard', solved: leetcodeStats.hardSolved, total: leetcodeStats.hardTotal || 1, color: '#ef4444' },
  ], [leetcodeStats.easySolved, leetcodeStats.mediumSolved, leetcodeStats.hardSolved,
  leetcodeStats.easyTotal, leetcodeStats.mediumTotal, leetcodeStats.hardTotal]);

  return (
    <section id="leetcode" className="leetcode section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          LeetCode Profile
        </motion.h2>

        <motion.div
          className="leetcode-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="leetcode-stats" variants={itemVariants}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="leetcode-difficulty" variants={itemVariants}>
            <h3>Problems Solved by Difficulty</h3>
            <div className="difficulty-stats">
              {difficultyStats.map((difficulty, index) => (
                <motion.div
                  key={difficulty.label}
                  className="difficulty-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="difficulty-header">
                    <span className="difficulty-label">{difficulty.label}</span>
                    <span className="difficulty-count">
                      {difficulty.solved} / {difficulty.total}
                    </span>
                  </div>
                  <div className="difficulty-bar">
                    <motion.div
                      className="difficulty-progress"
                      style={{ backgroundColor: difficulty.color }}
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? {
                            width: `${(difficulty.solved / difficulty.total) * 100}%`,
                          }
                          : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="profile-links">
            <motion.div
              className="leetcode-link"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="leetcode-button"
              >
                View LeetCode Profile
              </a>
            </motion.div>
            <motion.div
              className="leetcode-link"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://codolio.com/profile/abhijeetsingh"
                target="_blank"
                rel="noopener noreferrer"
                className="codolio-button"
              >
                View Codolio Profile
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

LeetCode.displayName = 'LeetCode';

export default LeetCode;


