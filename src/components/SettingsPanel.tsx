'use client';
import { useState } from 'react';
import { Settings, X, Palette, Zap, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface SettingsPanelProps {
  onDotGridChange?: (config: any) => void;
}

export default function SettingsPanel({ onDotGridChange }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, presets } = useTheme();
  const [dotConfig, setDotConfig] = useState({
    dotSize: 8,
    gap: 20,
    proximity: 120,
    shockRadius: 200,
    shockStrength: 4,
  });

  const handleDotConfigChange = (key: string, value: number) => {
    const newConfig = { ...dotConfig, [key]: value };
    setDotConfig(newConfig);
    onDotGridChange?.(newConfig);
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
        title="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Theme Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Theme
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(presets).map(([name, preset]) => (
                  <button
                    key={name}
                    onClick={() => setTheme(preset)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      theme === preset
                        ? 'border-white/40 bg-white/20'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span className="text-white text-sm font-medium capitalize">
                        {name}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* DotGrid Configuration */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Animation
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Dot Size: {dotConfig.dotSize}px
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={dotConfig.dotSize}
                    onChange={(e) => handleDotConfigChange('dotSize', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Gap: {dotConfig.gap}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="40"
                    value={dotConfig.gap}
                    onChange={(e) => handleDotConfigChange('gap', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Proximity: {dotConfig.proximity}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={dotConfig.proximity}
                    onChange={(e) => handleDotConfigChange('proximity', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Click Effect: {dotConfig.shockStrength}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={dotConfig.shockStrength}
                    onChange={(e) => handleDotConfigChange('shockStrength', parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Performance Info */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Performance Tips
              </h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Smaller dots and larger gaps improve performance</li>
                <li>• Reduce proximity for less CPU usage</li>
                <li>• Lower click effects for smoother animations</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #5227FF, #8B5CF6);
          cursor: pointer;
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #5227FF, #8B5CF6);
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </>
  );
}