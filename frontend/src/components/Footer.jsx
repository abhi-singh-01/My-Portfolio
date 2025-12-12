import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            Made with <FaHeart className="heart-icon" /> by Abhijeet Singh
          </p>
          <p className="footer-year">© {currentYear} All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

