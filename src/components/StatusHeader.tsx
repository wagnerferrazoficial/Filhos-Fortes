import { useState, useEffect } from 'react';
import { Clock, Calendar, CheckSquare, FileText, Flame } from 'lucide-react';

interface StatusHeaderProps {
  completedTasksCount: number;
  totalTasksCount: number;
  notesCount: number;
  focusSessionsCount: number;
}

export default function StatusHeader({
  completedTasksCount,
  totalTasksCount,
  notesCount,
  focusSessionsCount,
}: StatusHeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 5) return 'Good night';
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100" id="dashboard-header">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight" id="header-greeting">
          {getGreeting()}, <span className="text-indigo-600">Creator</span>
        </h1>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 font-medium">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{formattedDate}</span>
          <span className="text-gray-300">•</span>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">Active Session</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Real-time Clock Widget */}
        <div className="flex items-center gap-3 bg-white border border-gray-100 px-4 py-2.5 rounded-2xl shadow-sm" id="clock-widget">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-mono">Local Time</div>
            <div className="text-lg font-bold text-gray-900 font-mono tracking-wider">{formattedTime}</div>
          </div>
        </div>

        {/* Dynamic Statistics Hub */}
        <div className="flex items-center gap-2 text-gray-600">
          <div className="flex items-center gap-6 bg-gray-50/80 px-5 py-3 rounded-2xl border border-gray-100/60" id="stats-widget">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-500" />
              <div>
                <span className="block text-xs text-gray-400 font-medium">Tasks</span>
                <span className="text-sm font-bold text-gray-800 font-mono">
                  {completedTasksCount}/{totalTasksCount}
                </span>
              </div>
            </div>

            <div className="w-[1px] h-6 bg-gray-200" />

            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-500" />
              <div>
                <span className="block text-xs text-gray-400 font-medium">Notes</span>
                <span className="text-sm font-bold text-gray-800 font-mono">{notesCount}</span>
              </div>
            </div>

            <div className="w-[1px] h-6 bg-gray-200" />

            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <div>
                <span className="block text-xs text-gray-400 font-medium">Focus</span>
                <span className="text-sm font-bold text-gray-800 font-mono">{focusSessionsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
