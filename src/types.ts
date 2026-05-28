export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  color: string;
}

export interface TimerState {
  timeLeft: number;
  duration: number;
  isActive: boolean;
  mode: 'work' | 'shortBreak' | 'longBreak';
  completedSessions: number;
}
