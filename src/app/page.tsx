'use client';
import { useState, useRef } from 'react';
import { Download, AlertCircle } from 'lucide-react';
import { generateContent } from '@/lib/ai';
import DotGrid from '@/components/DotGrid';
import ThemeToggleButton from '@/components/ui/theme-toggle-button';
import ClientOnly from '@/components/ClientOnly';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [prdContent, setPrdContent] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const loadingSteps = [
    { text: "🔍 Analyzing your requirements...", duration: 1000 },
    { text: "📋 Understanding your product vision...", duration: 1200 },
    { text: "🎨 Crafting the perfect design...", duration: 1500 },
    { text: "🏗️ Architecting the structure...", duration: 1100 },
    { text: "⚡ Building interactive components...", duration: 1200 },
    { text: "🎯 Optimizing user experience...", duration: 1000 },
    { text: "🔧 Implementing functionality...", duration: 1300 },
    { text: "📱 Making it mobile-responsive...", duration: 800 },
    { text: "🎪 Adding animations and transitions...", duration: 900 },
    { text: "🔒 Ensuring accessibility compliance...", duration: 1000 },
    { text: "✨ Adding final touches...", duration: 1000 },
    { text: "🧪 Testing across devices...", duration: 800 },
    { text: "🚀 Almost ready to launch...", duration: 500 }
  ];

  const generatePrototype = async () => {
    if (!prdContent.trim()) {
      setError('Please enter your PRD content first');
      return;
    }

    setIsLoading(true);
    setError('');
    setLoadingStep(0);

    // Start the loading animation
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    try {
      const contentToProcess = prdContent;

      const prompt = `You are a prototype generator. Based on the following Product Requirements Document (PRD), create a complete, functional HTML prototype with inline CSS and JavaScript.

IMPORTANT INSTRUCTIONS:
1. Return ONLY valid HTML code - no markdown, no backticks, no explanations
2. Include all CSS inline in a <style> tag in the <head>
3. Include all JavaScript inline in <script> tags
4. Make it a complete, working prototype that demonstrates all features mentioned in the PRD
5. Use modern, clean design with good UX
6. Ensure all interactive elements work properly
7. Make it mobile-responsive
8. Start directly with <!DOCTYPE html> and end with </html>
9. Use modern CSS features like flexbox, grid, and animations
10. Include proper form validation and interactive elements

PRD CONTENT:
${contentToProcess}

Generate the complete HTML prototype now:`;

      const response = await generateContent(prompt);

      let cleanHTML = response.trim();

      if (cleanHTML.startsWith('```html')) {
        cleanHTML = cleanHTML.replace(/^```html\n/, '').replace(/\n```$/, '');
      } else if (cleanHTML.startsWith('```')) {
        cleanHTML = cleanHTML.replace(/^```\n/, '').replace(/\n```$/, '');
      }

      setGeneratedHTML(cleanHTML);
      renderPrototype(cleanHTML);
      setShowPreview(true);

    } catch (error) {
      console.error('Error:', error);
      setError('Error generating prototype. Please check your AI API key and try again.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const renderPrototype = (html: string) => {
    if (iframeRef.current) {
      try {
        const iframe = iframeRef.current;

        // Method 1: Use srcdoc attribute (more reliable)
        iframe.srcdoc = html;

        // Method 2: Fallback to document.write
        setTimeout(() => {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc && !iframe.srcdoc) {
            iframeDoc.open();
            iframeDoc.write(html);
            iframeDoc.close();
          }
        }, 100);

        console.log('Prototype rendered successfully');
      } catch (error) {
        console.error('Error rendering prototype:', error);
        setError('Failed to render prototype. Please try again.');
      }
    }
  };

  const downloadPrototype = () => {
    if (!generatedHTML) {
      setError('No prototype has been generated yet');
      return;
    }

    try {
      const blob = new Blob([generatedHTML], { type: 'text/html;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'prototype.html';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Download error:', error);
      setError('Error downloading prototype');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 text-gray-900 dark:text-gray-100 flex flex-col relative overflow-hidden transition-all duration-500">
      {/* Interactive Background */}
      <div className="fixed inset-0 z-0">
        <DotGrid
          dotSize={8}
          gap={35}
          baseColor="#475569"
          activeColor="#1d4ed8"
          proximity={120}
          shockRadius={180}
          shockStrength={4}
          resistance={400}
          returnDuration={1.2}
          className="w-full h-full opacity-90 dark:opacity-50"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-8 text-center border-b border-white/20 dark:border-gray-700/20 backdrop-blur-sm bg-white/10 dark:bg-black/10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1"></div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">PRD to Prototype</h1>
          </div>
          <div className="flex-1 flex justify-end items-center gap-4">
            <ClientOnly fallback={<div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse mt-2" />}>
              <ThemeToggleButton 
                variant="circle-blur" 
                start="center"
                className="mt-2"
              />
            </ClientOnly>
          </div>
        </div>
        <p className="text-gray-800 dark:text-gray-200 text-lg">
          Transform your Product Requirements Document into a working prototype
        </p>
      </header>

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col p-8 max-w-7xl mx-auto w-full">

        {/* Input Section */}
        {!isLoading && !showPreview && (
          <div className="space-y-8">
            {/* Text Input Option */}
            <div className="bg-white/70 dark:bg-black/30 backdrop-blur-md border-2 border-white/30 dark:border-gray-700/30 rounded-xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Enter Your PRD Text</h2>
                <button
                  onClick={() => setPrdContent(`# Task Management Application - PRD

## Overview
Build a modern, responsive task management application that allows users to create, organize, and track their daily tasks efficiently.

## Core Features

### 1. Task Management
- Create new tasks with title, description, and due date
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Task priority levels (High, Medium, Low)

### 2. User Interface
- Clean, modern design
- Responsive layout for desktop and mobile
- Dark/light theme toggle
- Intuitive navigation
- Real-time updates

### 3. Organization
- Task categories/tags
- Filter tasks by status, priority, or category
- Search functionality
- Sort tasks by due date, priority, or creation date

### 4. User Experience
- Drag and drop task reordering
- Keyboard shortcuts
- Confirmation dialogs for destructive actions
- Loading states and error handling

## Technical Requirements

### Frontend
- Modern JavaScript framework (React/Vue/Angular)
- Responsive CSS framework
- Local storage for data persistence
- Progressive Web App capabilities

### Design Requirements
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1)
- Fast loading times
- Smooth animations and transitions

### Browser Support
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Success Metrics
- Task completion rate
- User engagement time
- Mobile usage percentage
- User satisfaction score`)}
                  className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Load Sample PRD
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Paste or type your Product Requirements Document directly</p>

              <textarea
                value={prdContent}
                onChange={(e) => setPrdContent(e.target.value)}
                placeholder="Paste your PRD content here...

Example:
# Product Requirements Document

## Overview
Build a task management application...

## Features
- User authentication
- Task creation and editing
- Due date reminders
- Team collaboration

## Technical Requirements
- Responsive design
- Modern UI/UX
- Real-time updates"
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-black/20 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />

              {prdContent.trim() && (
                <div className="mt-4 text-center">
                  <button
                    onClick={generatePrototype}
                    className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Generate Prototype
                  </button>
                </div>
              )}
            </div>


          </div>
        )}

        {/* Enhanced Loading Section */}
        {isLoading && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6 bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30 dark:border-gray-700/30">
              {/* Animated Logo/Icon */}
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto relative">
                  {/* Outer rotating ring */}
                  <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin"></div>
                  {/* Inner pulsing circle */}
                  <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">AI</span>
                  </div>
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/2 -right-4 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>

              {/* Dynamic Loading Text */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 animate-pulse">
                  Creating Magic ✨
                </h2>
                <div className="h-8 flex items-center justify-center">
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium transition-all duration-500 ease-in-out transform">
                    {loadingSteps[loadingStep]?.text || "🚀 Launching your prototype..."}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${((loadingStep + 1) / loadingSteps.length) * 100}%`,
                      boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {Math.round(((loadingStep + 1) / loadingSteps.length) * 100)}% Complete
                </p>
              </div>

              {/* Fun Facts */}
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                <p className="text-sm text-gray-600 italic">
                  {loadingStep < 2 && "💡 Did you know? Our AI analyzes thousands of design patterns to create your perfect prototype!"}
                  {loadingStep >= 2 && loadingStep < 4 && "🎨 Fun fact: We're using advanced algorithms to ensure your prototype follows modern UX principles!"}
                  {loadingStep >= 4 && loadingStep < 6 && "📱 Almost there! We're making sure your prototype works beautifully on all devices!"}
                  {loadingStep >= 6 && "🎉 Final touches being applied! Your prototype will be ready in seconds!"}
                </p>
              </div>

              {/* Floating Animation Elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/3 right-1/6 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50/80 backdrop-blur-md border border-red-200/50 text-red-700 p-4 rounded-xl mb-8 flex items-center gap-2 shadow-lg">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Preview Section */}
        {showPreview && (
          <div className="flex-1 min-h-[600px]">
            <div className="border border-white/30 rounded-xl overflow-hidden h-full flex flex-col bg-white/70 backdrop-blur-md shadow-xl">
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <span className="font-semibold">Generated Prototype</span>
                <button
                  onClick={downloadPrototype}
                  className="bg-black text-white px-6 py-2 rounded hover:opacity-80 transition-opacity flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download HTML
                </button>
              </div>
              <div className="flex-1 p-4 bg-white">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-none bg-white min-h-[600px] rounded"
                  title="Generated Prototype"
                  srcDoc={generatedHTML || '<html><body><p>Loading prototype...</p></body></html>'}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        {showPreview && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setShowPreview(false);
                setGeneratedHTML('');
                setPrdContent('');
              }}
              className="bg-white/70 backdrop-blur-md text-gray-800 px-6 py-2 rounded-xl hover:bg-white/90 transition-all duration-200 border border-white/30 shadow-lg"
            >
              Create Another Prototype
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-6 text-center border-t border-white/20 dark:border-gray-700/20 backdrop-blur-sm bg-white/5 dark:bg-black/5">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Created with <span className="text-red-500 animate-pulse">💖</span> by{' '}
          <span className="font-semibold text-gray-800 dark:text-gray-200">Anubhav</span>
        </p>
      </footer>
    </div>
  );
}