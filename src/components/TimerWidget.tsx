import React, { useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TimerState } from '../types';

interface TimerWidgetProps {
  timer: TimerState;
  setTimer: React.Dispatch<React.SetStateAction<TimerState>>;
  onSessionComplete: () => void;
}

export default function TimerWidget({ timer, setTimer, onSessionComplete }: TimerWidgetProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev.timeLeft <= 1) {
            clearInterval(intervalRef.current!);
            // Trigger web synth notification
            playNotificationSound();
            onSessionComplete();
            
            // Switch mode automatically
            let nextMode: 'work' | 'shortBreak' | 'longBreak' = 'work';
            let nextDuration = 25 * 60;
            let nextSessions = prev.completedSessions;

            if (prev.mode === 'work') {
              nextSessions += 1;
              if (nextSessions % 4 === 0) {
                nextMode = 'longBreak';
                nextDuration = 15 * 60;
              } else {
                nextMode = 'shortBreak';
                nextDuration = 5 * 60;
              }
            } else {
              nextMode = 'work';
              nextDuration = 25 * 60;
            }

            return {
              ...prev,
              isActive: false,
              mode: nextMode,
              duration: nextDuration,
              timeLeft: nextDuration,
              completedSessions: nextSessions,
            };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timer.isActive, timer.mode, setTimer, onSessionComplete]);

  // Pure Web Audio API Synthesizer (Zero dependencies or external assets)
  const playNotificationSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Warm synth bell sound
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.82);
    } catch (e) {
      console.warn('Audio context standard restriction: ', e);
    }
  };

  const handleToggle = () => {
    setTimer((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleReset = () => {
    setTimer((prev) => ({ ...prev, isActive: false, timeLeft: prev.duration }));
  };

  const setMode = (mode: 'work' | 'shortBreak' | 'longBreak') => {
    let duration = 25 * 60;
    if (mode === 'shortBreak') duration = 5 * 60;
    if (mode === 'longBreak') duration = 15 * 60;

    setTimer((prev) => ({
      ...prev,
      isActive: false,
      mode,
      duration,
      timeLeft: duration,
    }));
  };

  // Human friendly countdown string
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // SVG circular countdown calculations
  const progressRatio = timer.timeLeft / timer.duration;
  const strokeDashoffset = 280 * (1 - progressRatio);

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-between min-h-[420px] relative overflow-hidden" id="pomo-timer-card">
      {/* Decorative top header bg accent */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-indigo-500/20" />

      {/* Mode Selectors */}
      <div className="flex bg-gray-50 p-1.5 rounded-2xl w-full max-w-xs justify-between gap-1 border border-gray-100" id="timer-mode-selectors">
        <button
          onClick={() => setMode('work')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
            timer.mode === 'work'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
          }`}
          id="btn-mode-work"
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Work</span>
        </button>

        <button
          onClick={() => setMode('shortBreak')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
            timer.mode === 'shortBreak'
              ? 'bg-white text-teal-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
          }`}
          id="btn-mode-short"
        >
          <Coffee className="w-3.5 h-3.5" />
          <span>Rest</span>
        </button>

        <button
          onClick={() => setMode('longBreak')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
            timer.mode === 'longBreak'
              ? 'bg-white text-violet-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
          }`}
          id="btn-mode-long"
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Deep</span>
        </button>
      </div>

      {/* Circular Timer Visual Display */}
      <div className="relative flex items-center justify-center my-6" id="timer-radial-container">
        <svg className="w-56 h-56 transform -rotate-90">
          {/* Track circle */}
          <circle
            cx="112"
            cy="112"
            r="90"
            className="stroke-gray-50 text-gray-100"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Animated active progress circle */}
          <motion.circle
            cx="112"
            cy="112"
            r="90"
            className={`stroke-current ${
              timer.mode === 'work'
                ? 'text-indigo-600'
                : timer.mode === 'shortBreak'
                ? 'text-teal-500'
                : 'text-violet-500'
            }`}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray="565.48" // 2 * PI * r
            animate={{ strokeDashoffset: 565.48 * (1 - progressRatio) }}
            transition={{ duration: timer.isActive ? 1 : 0.3, ease: 'linear' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Live digital clock text in the center */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-gray-900 font-mono tracking-tight" id="timer-text">
            {formatTime(timer.timeLeft)}
          </span>
          <span className="text-xs text-gray-400 font-medium uppercase mt-1 tracking-widest font-sans flex items-center gap-1">
            {timer.isActive ? (
              <>
                <Sparkles className="w-3 h-3 text-amber-500 animate-spin" />
                <span>Running</span>
              </>
            ) : (
              <span>Paused</span>
            )}
          </span>
        </div>
      </div>

      {/* Control Buttons Container */}
      <div className="flex items-center gap-5 w-full justify-center" id="timer-controls">
        <button
          onClick={handleReset}
          className="p-3 text-gray-400 hover:text-gray-600 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
          id="btn-timer-reset"
          title="Reset timer"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={handleToggle}
          className={`px-8 py-3.5 text-white font-semibold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer ${
            timer.isActive
              ? 'bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-200'
              : timer.mode === 'work'
              ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 focus:ring-4 focus:ring-indigo-100'
              : timer.mode === 'shortBreak'
              ? 'bg-teal-500 hover:bg-teal-600 shadow-teal-50 focus:ring-4 focus:ring-teal-100'
              : 'bg-violet-600 hover:bg-violet-700 shadow-violet-100 focus:ring-4 focus:ring-violet-100'
          }`}
          id="btn-timer-toggle"
        >
          {timer.isActive ? (
            <>
              <Pause className="w-5 h-4 fill-white" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-4 fill-white animate-bounce" />
              <span>Start Focus</span>
            </>
          )}
        </button>
      </div>

      {/* Footer session counter bar */}
      <div className="w-full flex justify-between items-center text-xs text-gray-400 border-t border-gray-50 pt-4 mt-2" id="timer-footer">
        <span>Session Progress</span>
        <div className="flex items-center gap-1.5" id="session-dots">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                timer.completedSessions >= i
                  ? 'bg-indigo-600 scale-110'
                  : 'bg-gray-100 border border-gray-200/50'
              }`}
            />
          ))}
          <span className="ml-1 font-mono text-gray-500">
            ({timer.completedSessions})
          </span>
        </div>
      </div>
    </div>
  );
}
