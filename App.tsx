
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Paraphraser } from './components/Paraphraser';
import { Humanizer } from './components/Humanizer';
import { Detector } from './components/Detector';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Paraphraser);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Paraphraser:
        return <Paraphraser />;
      case Tab.Humanizer:
        return <Humanizer />;
      case Tab.Detector:
        return <Detector />;
      default:
        return <Paraphraser />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="mt-8">
          {renderContent()}
        </main>
         <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Powered by Generative AI</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
