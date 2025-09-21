
import React, { useState, useCallback } from 'react';
import { detectAIText } from '../services/geminiService';
import { TextArea } from './shared/TextArea';
import { ActionButton } from './shared/ActionButton';
import { DetectorScore } from './shared/DetectorScore';
import type { DetectorResult } from '../types';

export const Detector: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<DetectorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDetect = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const detectionResult = await detectAIText(inputText);
      setResult(detectionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <div className="space-y-6">
      <TextArea
        id="detector-input"
        label="Text to Analyze"
        placeholder="Enter any text to check if it's AI-generated..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      <div className="flex justify-center">
        <ActionButton onClick={handleDetect} isLoading={isLoading} disabled={!inputText.trim()}>
          Detect AI Content
        </ActionButton>
      </div>
      {error && <div className="text-center text-red-400 p-3 bg-red-900/20 rounded-lg">{error}</div>}
      
      {(isLoading || result) && (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 text-center">Analysis Result</h3>
          <DetectorScore isLoading={isLoading} result={result} />
        </div>
      )}
    </div>
  );
};
