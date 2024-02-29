import React from 'react';
import Header from './header';
import Hero from './hero';
import Features from './features';
import About from './about';
import Footer from './footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
};

export default Home;