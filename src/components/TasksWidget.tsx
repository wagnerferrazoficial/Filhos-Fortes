import React, { useState } from 'react';
import { Plus, Trash2, Check, Filter, ClipboardList, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Task } from '../types';

interface TasksWidgetProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TasksWidget({ tasks, setTasks }: TasksWidgetProps) {
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: inputText.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setInputText('');
  };

  const handleToggleCompleted = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Get filtered items
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col h-full min-h-[460px]" id="tasks-widget-card">
      <div className="flex items-center justify-between mb-5" id="tasks-header">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <ClipboardList className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">Active Tasks</h2>
        </div>
        
        {/* Dynamic filters */}
        <div className="flex gap-1.5 text-xs bg-gray-50 p-1 rounded-xl border border-gray-100/60" id="task-filter-group">
          {(['all', 'active', 'completed'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all duration-300 cursor-pointer ${
                filter === mode
                  ? 'bg-white text-indigo-700 shadow-xs border border-gray-100'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              id={`filter-${mode}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form for adding task */}
      <form onSubmit={handleAddTask} className="flex gap-2 mb-4" id="add-task-form">
        <div className="flex-1 flex gap-2 border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 rounded-2xl p-1 px-3 bg-gray-50/50 transition-all items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a priority milestone..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400 py-1.5"
            id="task-input-field"
          />
          
          {/* Priority picker toggle inside input */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="text-xs font-semibold bg-white border border-gray-100 rounded-lg py-1 px-2.5 text-gray-600 outline-none cursor-pointer hover:bg-gray-50 transition-colors"
            id="task-priority-selector"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Mod Priority</option>
            <option value="high">Urgent</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-2xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
          id="btn-add-task"
          title="Create task"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      {/* Task List container */}
      <div className="flex-1 overflow-y-auto max-h-[290px] pr-1" id="task-list-viewport">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400" id="empty-tasks-view">
            <AlertCircle className="w-8 h-8 text-gray-300 stroke-[1.5] mb-2" />
            <p className="text-sm font-medium">No tasks in current filter</p>
            <p className="text-xs text-gray-300 mt-1">Add tasks above to keep tracking your goals</p>
          </div>
        ) : (
          <div className="space-y-2.5" id="task-list">
            <AnimatePresence initial={false}>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleToggleCompleted(task.id)}
                  className={`flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition-all duration-300 group ${
                    task.completed
                      ? 'bg-gray-50/50 border-gray-100/80 text-gray-400/80'
                      : 'bg-white hover:bg-gray-50/20 hover:border-indigo-100/80 border-gray-100 shadow-xs'
                  }`}
                  id={`task-item-${task.id}`}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    {/* Beautiful styled checkbox button */}
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-gray-200 group-hover:border-indigo-400'
                      }`}
                      id={`checkbox-${task.id}`}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />}
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <span
                        className={`text-sm font-medium block truncate ${
                          task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                        }`}
                        id={`text-${task.id}`}
                      >
                        {task.text}
                      </span>
                    </div>

                    {/* Priority Tag indicator */}
                    <span
                      className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md ${
                        task.completed
                          ? 'bg-gray-100/40 text-gray-300'
                          : task.priority === 'high'
                          ? 'bg-rose-50 text-rose-600'
                          : task.priority === 'medium'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-emerald-50 text-emerald-600'
                      }`}
                      id={`priority-${task.id}`}
                    >
                      {task.priority === 'high' ? 'Urgent' : task.priority === 'medium' ? 'Mod' : 'Low'}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleDeleteTask(task.id, e)}
                    className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    id={`btn-delete-${task.id}`}
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Task Stats Info Footer */}
      <div className="text-[11px] text-gray-400 mt-4 border-t border-gray-50 pt-3 flex justify-between items-center" id="tasks-footer">
        <span>Completion efficiency</span>
        <span className="font-semibold text-gray-700">
          {Math.round(
            (tasks.filter((t) => t.completed).length / (tasks.length || 1)) * 100
          )}
          % Completed
        </span>
      </div>
    </div>
  );
}
