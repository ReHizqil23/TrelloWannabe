import { useState, useEffect } from 'react';

export default function GoalsPage() {
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('trello_wannabe_goals');
    if (savedGoals) return JSON.parse(savedGoals);
    return [
      { id: 1, title: 'Selesaikan Project UTS', progress: 75, color: 'bg-[#7b68ee]', due: '20 Nov 2026' },
      { id: 2, title: 'Belajar React Hooks', progress: 100, color: 'bg-green-500', due: '15 Nov 2026' },
      { id: 3, title: 'Riset Desain Kanban', progress: 40, color: 'bg-yellow-400', due: '25 Nov 2026' },
    ];
  });

  const [newTitle, setNewTitle] = useState("");
  const [newDue, setNewDue] = useState("");

  useEffect(() => {
    localStorage.setItem('trello_wannabe_goals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newTitle.trim() === "") return;
    const newGoal = { id: Date.now(), title: newTitle, progress: 0, color: 'bg-gray-400', due: newDue || "Belum diset" };
    setGoals([...goals, newGoal]);
    setNewTitle("");
    setNewDue("");
  };

  return (
    <div className="p-8 w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#2a2e34] mb-4">Team Goals</h1>
        <form onSubmit={handleAddGoal} className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <input type="text" placeholder="Nama Goal baru..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="flex-1 min-w-[200px] border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee]" required />
          <input type="text" placeholder="Tenggat (ex: 30 Des 2026)" value={newDue} onChange={(e) => setNewDue(e.target.value)} className="w-[180px] border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee]" />
          <button type="submit" className="bg-[#7b68ee] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors shadow-sm">+ Tambah Goal</button>
        </form>
      </header>
      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(30,40,80,0.08)] border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#2a2e34] text-lg">{goal.title}</h3>
              <span className="text-xs font-bold text-gray-400">Tenggat: {goal.due}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-100 rounded-full h-3">
                <div className={`${goal.color} h-3 rounded-full transition-all duration-500`} style={{ width: `${goal.progress}%` }}></div>
              </div>
              <span className="font-extrabold text-[#2a2e34] w-12 text-right">{goal.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}