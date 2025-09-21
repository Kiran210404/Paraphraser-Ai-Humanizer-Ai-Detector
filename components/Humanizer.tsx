
import React, { useState, useCallback } from 'react';
import { humanizeText } from '../services/geminiService';
import { TextArea } from './shared/TextArea';
import { ActionButton } from './shared/ActionButton';
import { ResultCard } from './shared/ResultCard';

export const Humanizer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleHumanize = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to humanize.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultText('');
    try {
      const humanized = await humanizeText(inputText);
      setResultText(humanized);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <div className="space-y-6">
      <TextArea
        id="humanizer-input"
        label="AI-Generated Text"
        placeholder="Paste your AI-generated text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      <div className="flex justify-center">
        <ActionButton onClick={handleHumanize} isLoading={isLoading} disabled={!inputText.trim()}>
          Humanize Text
        </ActionButton>
      </div>
      {error && <div className="text-center text-red-400 p-3 bg-red-900/20 rounded-lg">{error}</div>}
      <ResultCard
        title="Humanized Result"
        text={resultText}
        isLoading={isLoading}
        placeholder="The human-like version of your text will appear here..."
      />
    </div>
  );
};
