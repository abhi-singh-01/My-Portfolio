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
          Coding Profiles
        </motion.h2>

        <div className="coding-profiles-grid">
          {/* LeetCode Card */}
          <motion.div
            className="leetcode-single-card"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="leetcode-card-header">
              <div className="leetcode-avatar">
                <FaCode />
              </div>
              <div className="leetcode-user-info">
                <h3>LeetCode Profile</h3>
                <span className="leetcode-rank">Rank #{leetcodeStats.ranking.toLocaleString()}</span>
              </div>
            </div>

            <div className="leetcode-card-stats">
              <div className="total-solved-circle">
                <motion.div
                  className="circle-value"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="big-number">{leetcodeStats.totalSolved}</span>
                  <span className="label">Solved</span>
                </motion.div>
              </div>

              <div className="difficulty-breakdown">
                {difficultyStats.map((difficulty, index) => (
                  <motion.div
                    key={difficulty.label}
                    className="difficulty-row"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <span className="diff-label" style={{ color: difficulty.color }}>
                      {difficulty.label}
                    </span>
                    <div className="diff-bar-container">
                      <motion.div
                        className="diff-bar"
                        style={{ backgroundColor: difficulty.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${(difficulty.solved / difficulty.total) * 100}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                    <span className="diff-count">{difficulty.solved}/{difficulty.total}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="leetcode-profile-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaStar /> View Profile
            </motion.a>
          </motion.div>

          {/* Codolio Card */}
          <motion.div
            className="leetcode-single-card codolio-card"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="leetcode-card-header">
              <div className="leetcode-avatar codolio-avatar">
                <FaChartLine />
              </div>
              <div className="leetcode-user-info">
                <h3>Codolio Profile</h3>
                <span className="codolio-tagline">Coding Analytics & Insights</span>
              </div>
            </div>

            <div className="codolio-content">
              <p className="codolio-description">
                Track my coding journey across multiple platforms with detailed analytics, streaks, and performance insights.
              </p>
              <div className="codolio-features">
                <span className="codolio-feature">📊 Multi-Platform Stats</span>
                <span className="codolio-feature">🔥 Coding Streaks</span>
              </div>
            </div>

            <motion.a
              href="https://codolio.com/profile/abhijeetsingh"
              target="_blank"
              rel="noopener noreferrer"
              className="leetcode-profile-btn codolio-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaStar /> View Profile
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

LeetCode.displayName = 'LeetCode';

export default LeetCode;


