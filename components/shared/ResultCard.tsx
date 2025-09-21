
import React, { useState } from 'react';
import { Spinner } from './Spinner';

interface ResultCardProps {
  title: string;
  text: string;
  isLoading: boolean;
  placeholder: string;
}

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export const ResultCard: React.FC<ResultCardProps> = ({ title, text, isLoading, placeholder }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
        {text && !isLoading && (
          <button 
            onClick={handleCopy}
            className="text-slate-400 hover:text-sky-400 transition-colors duration-200 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            title="Copy to clipboard"
          >
            {copied ? 'Copied!' : <CopyIcon className="w-5 h-5" />}
          </button>
        )}
      </div>
      <div className="min-h-[150px] p-4 bg-slate-900 rounded-md whitespace-pre-wrap text-slate-300 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
            <Spinner />
          </div>
        )}
        {!isLoading && !text && <p className="text-slate-500">{placeholder}</p>}
        {text}
      </div>
    </div>
  );
};
