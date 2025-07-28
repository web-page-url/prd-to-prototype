'use client';
import { useState, useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

interface PerformanceStats {
  fps: number;
  memory: number;
  renderTime: number;
}

export default function PerformanceMonitor() {
  const [stats, setStats] = useState<PerformanceStats>({ fps: 0, memory: 0, renderTime: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const renderTimes = useRef<number[]>([]);

  useEffect(() => {
    let animationId: number;

    const updateStats = () => {
      const now = performance.now();
      frameCount.current++;

      // Calculate FPS every second
      if (now - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
        
        // Calculate average render time
        const avgRenderTime = renderTimes.current.length > 0
          ? renderTimes.current.reduce((a, b) => a + b, 0) / renderTimes.current.length
          : 0;

        // Get memory usage (if available)
        const memory = (performance as any).memory 
          ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) 
          : 0;

        setStats({
          fps,
          memory,
          renderTime: Math.round(avgRenderTime * 100) / 100,
        });

        frameCount.current = 0;
        lastTime.current = now;
        renderTimes.current = [];
      }

      // Track render time
      const renderStart = performance.now();
      requestAnimationFrame(() => {
        const renderEnd = performance.now();
        renderTimes.current.push(renderEnd - renderStart);
        if (renderTimes.current.length > 60) {
          renderTimes.current.shift();
        }
      });

      animationId = requestAnimationFrame(updateStats);
    };

    if (isVisible) {
      updateStats();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-40 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
        title="Show performance stats"
      >
        <Activity className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 p-4 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 text-white min-w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Performance
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-xs text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={stats.fps < 30 ? 'text-red-400' : stats.fps < 50 ? 'text-yellow-400' : 'text-green-400'}>
            {stats.fps}
          </span>
        </div>
        
        {stats.memory > 0 && (
          <div className="flex justify-between">
            <span>Memory:</span>
            <span className={stats.memory > 100 ? 'text-yellow-400' : 'text-green-400'}>
              {stats.memory}MB
            </span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span>Render:</span>
          <span className={stats.renderTime > 16 ? 'text-red-400' : 'text-green-400'}>
            {stats.renderTime}ms
          </span>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-white/20">
        <div className="text-xs text-gray-400">
          Target: 60 FPS (16.67ms)
        </div>
      </div>
    </div>
  );
}