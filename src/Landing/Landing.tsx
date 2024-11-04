import React from 'react';
import ScrollingScene from './ScrollingScene';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-6">
          <h1 className="text-white text-2xl font-bold">Funding Rate Arbitrage Bot</h1>
        </nav>
      </header>
      
      <main>
        <ScrollingScene />
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 text-white text-center">
          <p>Scroll to learn more about how the bot works</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;