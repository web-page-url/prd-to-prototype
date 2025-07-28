'use client';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing AI Assistant...');

  useEffect(() => {
    const steps = [
      { progress: 20, text: 'Loading interactive background...' },
      { progress: 40, text: 'Connecting to Gemini AI...' },
      { progress: 60, text: 'Optimizing for your device...' },
      { progress: 80, text: 'Preparing chat interface...' },
      { progress: 100, text: 'Ready to chat!' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setLoadingText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="inline-flex p-6 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 mb-4">
            <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Assistant</h1>
          <p className="text-gray-400">Powered by Gemini AI</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="mb-4">
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <p className="text-sm text-gray-300 animate-pulse">
            {loadingText}
          </p>
          
          <div className="mt-4 text-xs text-gray-500">
            {progress}%
          </div>
        </div>

        {/* Animated Dots */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}