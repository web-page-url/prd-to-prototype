'use client';
import { useEffect, useState } from 'react';
import { Keyboard, X } from 'lucide-react';

interface KeyboardShortcutsProps {
  onNewChat?: () => void;
  onClearChat?: () => void;
  onToggleSettings?: () => void;
  onFocusInput?: () => void;
}

export default function KeyboardShortcuts({
  onNewChat,
  onClearChat,
  onToggleSettings,
  onFocusInput,
}: KeyboardShortcutsProps) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K - Focus input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onFocusInput?.();
      }
      
      // Ctrl/Cmd + N - New chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        onNewChat?.();
      }
      
      // Ctrl/Cmd + Shift + Delete - Clear chat
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Delete') {
        e.preventDefault();
        onClearChat?.();
      }
      
      // Ctrl/Cmd + , - Toggle settings
      if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        onToggleSettings?.();
      }
      
      // ? - Show help
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setShowHelp(true);
        }
      }
      
      // Escape - Close help
      if (e.key === 'Escape') {
        setShowHelp(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNewChat, onClearChat, onToggleSettings, onFocusInput]);

  const shortcuts = [
    { key: '?', description: 'Show this help' },
    { key: 'Ctrl + K', description: 'Focus message input', mac: '⌘ K' },
    { key: 'Ctrl + N', description: 'Start new chat', mac: '⌘ N' },
    { key: 'Ctrl + Shift + Del', description: 'Clear chat', mac: '⌘ ⇧ ⌫' },
    { key: 'Ctrl + ,', description: 'Open settings', mac: '⌘ ,' },
    { key: 'Escape', description: 'Close dialogs' },
    { key: 'Enter', description: 'Send message' },
    { key: 'Shift + Enter', description: 'New line in message' },
  ];

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  if (!showHelp) {
    return (
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-4 left-4 z-40 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowHelp(false)}
      />
      
      {/* Help Panel */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </h2>
          <button
            onClick={() => setShowHelp(false)}
            className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-gray-300 text-sm">
                {shortcut.description}
              </span>
              <kbd className="px-2 py-1 text-xs font-mono bg-white/20 rounded border border-white/30 text-white">
                {isMac && shortcut.mac ? shortcut.mac : shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <p className="text-xs text-gray-400 text-center">
            Press <kbd className="px-1 py-0.5 text-xs bg-white/20 rounded">?</kbd> anytime to show this help
          </p>
        </div>
      </div>
    </div>
  );
}