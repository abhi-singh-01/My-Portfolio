import React, { Suspense, lazy, memo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load components that are not immediately visible
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const LeetCode = lazy(() => import('./components/LeetCode'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Lightweight loading fallback with CSS animation
const LoadingFallback = memo(() => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    color: '#6366f1'
  }}>
    <div className="loading-spinner"></div>
  </div>
));

// Wrap each section with its own Suspense for parallel loading
const LazySection = memo(({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
));

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <LazySection><About /></LazySection>
      <LazySection><Skills /></LazySection>
      <LazySection><Projects /></LazySection>
      <LazySection><LeetCode /></LazySection>
      <LazySection><Contact /></LazySection>
      <LazySection><Footer /></LazySection>
    </div>
  );
}

export default App;

