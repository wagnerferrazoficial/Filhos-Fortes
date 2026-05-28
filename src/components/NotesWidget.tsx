import React, { useState } from 'react';
import { Search, FileText, Plus, Trash2, Edit3, X, Eye, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Note } from '../types';

interface NotesWidgetProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NOTE_COLORS = [
  'bg-emerald-50/50 border-emerald-100/60 text-emerald-800',
  'bg-amber-50/50 border-amber-100/60 text-amber-800',
  'bg-indigo-50/50 border-indigo-100/60 text-indigo-800',
  'bg-rose-50/50 border-rose-100/60 text-rose-800',
  'bg-cyan-50/50 border-cyan-100/60 text-cyan-800',
];

export default function NotesWidget({ notes, setNotes }: NotesWidgetProps) {
  const [search, setSearch] = useState('');
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(2); // Default to indigo

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateNote = () => {
    const freshNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled thoughts',
      content: 'Write something amazing here...',
      updatedAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      color: NOTE_COLORS[selectedColorIndex],
    };

    setNotes((prev) => [freshNote, ...prev]);
    setActiveNote(freshNote);
    setNewTitle(freshNote.title);
    setNewContent(freshNote.content);
    setIsEditing(true);
  };

  const handleSaveActiveNote = () => {
    if (!activeNote) return;

    const updated = notes.map((note) => {
      if (note.id === activeNote.id) {
        return {
          ...note,
          title: newTitle.trim() || 'Untitled thoughts',
          content: newContent,
          updatedAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          color: NOTE_COLORS[selectedColorIndex],
        };
      }
      return note;
    });

    setNotes(updated);
    setIsEditing(false);
    setActiveNote(null);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeNote?.id === id) {
      setActiveNote(null);
      setIsEditing(false);
    }
  };

  const openNote = (note: Note) => {
    setActiveNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
    const colorIndex = NOTE_COLORS.indexOf(note.color);
    if (colorIndex !== -1) {
      setSelectedColorIndex(colorIndex);
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col h-full min-h-[460px]" id="notes-widget-card">
      {/* Header element */}
      <div className="flex items-center justify-between mb-4" id="notes-header">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">Quick Canvas</h2>
        </div>

        {/* Create Note CTA */}
        <button
          onClick={handleCreateNote}
          className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          id="btn-create-note"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Search Input bar */}
      <div className="flex items-center gap-2 border border-gray-100 bg-gray-50/50 p-2.5 rounded-2xl mb-4 group focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 focus-within:bg-white transition-all" id="notes-search-container">
        <Search className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your notes..."
          className="flex-1 bg-transparent border-none outline-none text-xs text-gray-700 placeholder-gray-400"
          id="notes-search-field"
        />
      </div>

      {/* Note Grid / Items list */}
      <div className="flex-1 overflow-y-auto max-h-[300px] pr-1" id="notes-list-viewport">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400" id="empty-notes-view">
            <FileText className="w-8 h-8 text-gray-300 stroke-[1.5] mb-2" />
            <p className="text-sm font-medium">Clear minds keep tidy notes</p>
            <p className="text-xs text-gray-300 mt-1">Click &quot;New Note&quot; above to capture dynamic details</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="notes-grid">
            <AnimatePresence>
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => openNote(note)}
                  className={`border p-4 rounded-2xl cursor-pointer hover:shadow-xs group transition-all flex flex-col justify-between min-h-[110px] relative ${note.color}`}
                  id={`note-card-${note.id}`}
                  whileHover={{ y: -2 }}
                >
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 line-clamp-1" id={`note-title-${note.id}`}>
                        {note.title}
                      </h3>
                      <button
                        onClick={(e) => handleDeleteNote(note.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 rounded-md transition-all cursor-pointer"
                        id={`btn-del-note-${note.id}`}
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600/90 mt-1 line-clamp-3 leading-relaxed whitespace-pre-wrap font-sans" id={`note-content-${note.id}`}>
                      {note.content}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-900/5 pt-2 mt-2">
                    <span className="text-[10px] text-gray-400/80 font-semibold font-mono">{note.updatedAt}</span>
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 text-indigo-600 font-bold transition-all flex items-center gap-0.5">
                      <Bookmark className="w-2.5 h-2.5" />
                      <span>Configure</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Note view or edit modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
            id="note-editor-overlay"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-xl shadow-xl overflow-hidden border border-gray-100 flex flex-col"
              id="note-editor-modal"
            >
              {/* Modal header with Color Picker */}
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center" id="editor-header">
                <div className="flex gap-2 items-center">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mr-2">Color</span>
                  {NOTE_COLORS.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-5 h-5 rounded-full border border-black/10 transition-transform cursor-pointer ${col.split(' ')[0]} ${
                        selectedColorIndex === idx ? 'scale-125 border-indigo-500 shadow-sm' : ''
                      }`}
                      id={`color-picker-dot-${idx}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveNote(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 bg-white border border-gray-100 rounded-lg shadow-xs cursor-pointer"
                  id="btn-close-modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mode Details Form */}
              <div className="p-6 flex-1 flex flex-col" id="editor-body">
                {isEditing ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Note Title ..."
                    className="text-lg font-bold text-gray-800 outline-none border-b border-gray-100 pb-2 mb-4 w-full"
                    id="edit-title-field"
                  />
                ) : (
                  <h3 className="text-lg font-bold text-gray-800 pb-2 mb-4 border-b border-gray-100 flex items-center gap-2">
                    <Eye className="w-4.5 h-4.5 text-indigo-500" />
                    <span>{activeNote.title}</span>
                  </h3>
                )}

                {isEditing ? (
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Capture your stream of consciousness..."
                    className="flex-1 w-full text-sm text-gray-700 min-h-[220px] outline-none resize-none leading-relaxed"
                    id="edit-content-field"
                  />
                ) : (
                  <div className="flex-1 min-h-[220px] overflow-y-auto text-sm text-gray-600 leading-relaxed whitespace-pre-wrap" id="view-content-canvas">
                    {activeNote.content}
                  </div>
                )}
              </div>

              {/* Footer CTA and Actions */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" id="editor-actions">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl cursor-pointer bg-white"
                      id="btn-cancel-edit"
                    >
                      Browse
                    </button>
                    <button
                      onClick={handleSaveActiveNote}
                      className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer"
                      id="btn-confirm-saving"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center gap-1.5 cursor-pointer"
                    id="btn-trigger-edit"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit thoughts</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
