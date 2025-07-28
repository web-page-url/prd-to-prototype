'use client';
import { useState, useRef } from 'react';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import { generateContent } from '@/lib/gemini';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [prdContent, setPrdContent] = useState('');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generatePrototype = async () => {
    if (!prdContent.trim()) {
      setError('Please enter your PRD content first');
      return;
    }

    setIsLoading(true);
    setError('');

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
      setError('Error generating prototype. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPrototype = (html: string) => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
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
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="p-8 text-center border-b border-gray-200">
        <h1 className="text-4xl font-bold mb-2">PRD to Prototype</h1>
        <p className="text-gray-600 text-lg">
          Transform your Product Requirements Document into a working prototype
        </p>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col p-8 max-w-7xl mx-auto w-full">
        
        {/* Input Section */}
        {!isLoading && !showPreview && (
          <div className="space-y-8">
            {/* Text Input Option */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Enter Your PRD Text</h2>
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
                  className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                >
                  Load Sample PRD
                </button>
              </div>
              <p className="text-gray-600 text-center mb-6">Paste or type your Product Requirements Document directly</p>
              
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
                className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {prdContent.trim() && (
                <div className="mt-4 text-center">
                  <button
                    onClick={generatePrototype}
                    className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors"
                  >
                    Generate Prototype
                  </button>
                </div>
              )}
            </div>


          </div>
        )}

        {/* Loading Section */}
        {isLoading && (
          <div className="text-center py-16">
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
            <p className="text-xl mb-2">Generating your prototype...</p>
            <p className="text-gray-600">This may take a few moments</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-8 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Preview Section */}
        {showPreview && (
          <div className="flex-1 min-h-[600px]">
            <div className="border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col">
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
              className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Create Another Prototype
            </button>
          </div>
        )}
      </div>
    </div>
  );
}