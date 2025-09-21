
import React from 'react';
import { Tab } from '../types';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TabButton: React.FC<{
  tab: Tab;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: React.ReactNode;
}> = ({ tab, activeTab, onTabChange, children }) => {
  const isActive = tab === activeTab;
  const activeClasses = 'bg-sky-600 text-white';
  const inactiveClasses = 'bg-slate-700 text-slate-300 hover:bg-slate-600';
  
  return (
    <button
      onClick={() => onTabChange(tab)}
      className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500 mb-2">
        AI Text Toolkit
      </h1>
      <p className="text-slate-400 mb-8">Paraphrase, Humanize, and Detect with a single click.</p>
      <nav className="flex justify-center space-x-2 sm:space-x-4 p-2 bg-slate-800 rounded-lg shadow-lg">
        <TabButton tab={Tab.Paraphraser} activeTab={activeTab} onTabChange={onTabChange}>
          Paraphraser
        </TabButton>
        <TabButton tab={Tab.Humanizer} activeTab={activeTab} onTabChange={onTabChange}>
          Humanizer
        </TabButton>
        <TabButton tab={Tab.Detector} activeTab={activeTab} onTabChange={onTabChange}>
          AI Detector
        </TabButton>
      </nav>
    </header>
  );
};
