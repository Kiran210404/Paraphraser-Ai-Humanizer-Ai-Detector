
import React, { useState, useCallback } from 'react';
import { paraphraseText } from '../services/geminiService';
import { TextArea } from './shared/TextArea';
import { ActionButton } from './shared/ActionButton';
import { ResultCard } from './shared/ResultCard';

export const Paraphraser: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParaphrase = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to paraphrase.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultText('');
    try {
      const paraphrased = await paraphraseText(inputText);
      setResultText(paraphrased);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <div className="space-y-6">
      <TextArea
        id="paraphraser-input"
        label="Original Text"
        placeholder="Enter the text you want to paraphrase..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      <div className="flex justify-center">
        <ActionButton onClick={handleParaphrase} isLoading={isLoading} disabled={!inputText.trim()}>
          Paraphrase Text
        </ActionButton>
      </div>
       {error && <div className="text-center text-red-400 p-3 bg-red-900/20 rounded-lg">{error}</div>}
      <ResultCard
        title="Paraphrased Result"
        text={resultText}
        isLoading={isLoading}
        placeholder="Your paraphrased text will appear here..."
      />
    </div>
  );
};
