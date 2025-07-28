'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to AI Assistant! 🎉",
    description: "Experience the future of AI interaction with our beautiful, responsive chat interface powered by Gemini AI.",
  },
  {
    title: "Interactive Background ✨",
    description: "Move your mouse around to see the dots react! Click anywhere for beautiful ripple effects. On mobile, touch and drag for similar magic.",
  },
  {
    title: "Smart Chat Interface 💬",
    description: "Type your messages below and watch as AI responds with streaming text. Copy messages, regenerate responses, and enjoy the conversation!",
  },
  {
    title: "Customization Settings ⚙️",
    description: "Click the settings icon (top-right) to customize themes, adjust animation parameters, and make the app truly yours.",
  },
  {
    title: "Performance Monitor 📊",
    description: "Click the activity icon (bottom-right) to monitor real-time performance - FPS, memory usage, and render times.",
  },
  {
    title: "Keyboard Shortcuts ⌨️",
    description: "Press '?' anytime to see keyboard shortcuts. Use Ctrl+K to focus input, Ctrl+N for new chat, and more!",
  },
  {
    title: "Ready to Chat! 🚀",
    description: "You're all set! Start by typing a message or try one of the suggested prompts. Enjoy your AI-powered experience!",
  },
];

interface WelcomeTourProps {
  onComplete: () => void;
}

export default function WelcomeTour({ onComplete }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('hasSeenWelcomeTour');
    if (hasSeenTour) {
      setIsVisible(false);
      onComplete();
    }
  }, [onComplete]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenWelcomeTour', 'true');
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Tour Card */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-white">
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex space-x-2">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentStep
                    ? 'bg-white w-8'
                    : index < currentStep
                      ? 'bg-white/60'
                      : 'bg-white/20'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 mb-4">
            <Sparkles className="w-6 h-6 text-purple-300" />
          </div>

          <h2 className="text-2xl font-bold mb-4">
            {currentTourStep.title}
          </h2>

          <p className="text-gray-200 leading-relaxed">
            {currentTourStep.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Skip Tour
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 font-medium transition-all duration-200"
            >
              {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < tourSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Step Counter */}
        <div className="text-center mt-4 text-sm text-gray-400">
          Step {currentStep + 1} of {tourSteps.length}
        </div>
      </div>
    </div>
  );
}

// Hook to manage tour state
export function useWelcomeTour() {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenWelcomeTour');
    if (!hasSeenTour) {
      // Show tour after a short delay
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const resetTour = () => {
    localStorage.removeItem('hasSeenWelcomeTour');
    setShowTour(true);
  };

  return {
    showTour,
    setShowTour,
    resetTour,
  };
}