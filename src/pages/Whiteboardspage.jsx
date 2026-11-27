import { useState, useEffect } from 'react';

const defaultNotes = [
  { id: 1, text: 'Ide fitur baru: Dark Mode 🌙', color: 'bg-yellow-200', rotate: '-rotate-2' },
  { id: 2, text: 'Revisi UI Landing Page', color: 'bg-pink-200', rotate: 'rotate-2' },
  { id: 3, text: 'Tanya dosen soal API', color: 'bg-blue-200', rotate: '-rotate-1' },
];
const noteColors = ['bg-yellow-200', 'bg-pink-200', 'bg-blue-200', 'bg-green-200', 'bg-purple-200'];
const noteRotations = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1', 'rotate-3'];

export default function WhiteboardsPage() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('trello_wannabe_whiteboards');
    if (savedNotes) return JSON.parse(savedNotes);
    return defaultNotes;
  });
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    localStorage.setItem('trello_wannabe_whiteboards', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim() === "") return;
    const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
    const randomRotate = noteRotations[Math.floor(Math.random() * noteRotations.length)];
    const noteBaru = { id: Date.now(), text: newNote, color: randomColor, rotate: randomRotate };
    setNotes([...notes, noteBaru]);
    setNewNote("");
  };

  return (
    <div className="p-8 w-full relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#7b68ee 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <header className="relative mb-8">
        <h1 className="text-2xl font-bold text-[#2a2e34] mb-4">Whiteboards</h1>
        <form onSubmit={handleAddNote} className="flex gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <input type="text" placeholder="Tulis ide atau catatan baru..." value={newNote} onChange={(e) => setNewNote(e.target.value)} className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee]" required />
          <button type="submit" className="bg-[#7b68ee] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors shadow-sm">+ Add Note</button>
        </form>
      </header>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes.map((note) => (
          <div key={note.id} className={`${note.color} ${note.rotate} p-6 h-48 rounded-sm shadow-md hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between`}>
            <p className="font-bold text-gray-800 text-lg leading-snug break-words">{note.text}</p>
            <div className="flex justify-between items-center text-gray-500 text-xs font-bold"><span>Admin</span><span>Hari ini</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}