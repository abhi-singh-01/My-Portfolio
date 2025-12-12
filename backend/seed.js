const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected for seeding'))
  .catch(err => console.log('MongoDB Connection Error:', err));

const seedProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with MERN stack. Features include user authentication, product management, shopping cart, and payment integration.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    category: 'web',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    category: 'web',
  },
  {
    title: 'Social Media Dashboard',
    description: 'A comprehensive social media analytics dashboard with data visualization, real-time metrics, and interactive charts.',
    technologies: ['React', 'Chart.js', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    category: 'web',
  },
  {
    title: 'Weather App',
    description: 'A beautiful weather application with location-based forecasts, interactive maps, and detailed weather information.',
    technologies: ['React', 'OpenWeather API', 'CSS3'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    category: 'web',
  },
];

const seedSkills = [
  { name: 'React', category: 'Frontend', proficiency: 90, icon: 'react' },
  { name: 'Node.js', category: 'Backend', proficiency: 85, icon: 'nodejs' },
  { name: 'JavaScript', category: 'Frontend', proficiency: 90, icon: 'javascript' },
  { name: 'MongoDB', category: 'Database', proficiency: 80, icon: 'mongodb' },
  { name: 'Express', category: 'Backend', proficiency: 85, icon: 'express' },
  { name: 'HTML5', category: 'Frontend', proficiency: 95, icon: 'html5' },
  { name: 'CSS3', category: 'Frontend', proficiency: 90, icon: 'css3' },
  { name: 'Python', category: 'Backend', proficiency: 75, icon: 'python' },
  { name: 'Git', category: 'Tools', proficiency: 85, icon: 'git' },
  { name: 'Docker', category: 'Tools', proficiency: 70, icon: 'docker' },
  { name: 'AWS', category: 'Tools', proficiency: 65, icon: 'aws' },
  { name: 'Redux', category: 'Frontend', proficiency: 80, icon: 'redux' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 85, icon: 'tailwind' },
  { name: 'Firebase', category: 'Database', proficiency: 75, icon: 'firebase' },
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared existing data');

    // Insert projects
    const projects = await Project.insertMany(seedProjects);
    console.log(`Inserted ${projects.length} projects`);

    // Insert skills
    const skills = await Skill.insertMany(seedSkills);
    console.log(`Inserted ${skills.length} skills`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

