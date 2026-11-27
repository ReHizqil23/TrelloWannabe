import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Pastikan useEffect di-import

export default function TasksPage() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('trello_wannabe_tasks');
    if (savedTasks) return JSON.parse(savedTasks);
    return [
      { id: 1, title: 'Update contractor agreement', status: 'issues', stage: 'INITIATION', stageColor: 'bg-red-100 text-red-600' },
      { id: 2, title: 'Plan for next year', status: 'issues', stage: 'INITIATION', stageColor: 'bg-red-100 text-red-600' },
      { id: 3, title: 'Budget assessment', status: 'review', stage: 'PLANNING', stageColor: 'bg-purple-100 text-purple-600' },
      { id: 4, title: 'Finalize project scope', status: 'review', stage: 'EXECUTION', stageColor: 'bg-yellow-100 text-yellow-700' },
      { id: 5, title: 'New contractor agreement', status: 'ready', stage: 'PLANNING', stageColor: 'bg-purple-100 text-purple-600' },
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    localStorage.setItem('trello_wannabe_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "") return;
    const newTask = { id: Date.now(), title: newTaskTitle, status: 'issues', stage: 'NEW', stageColor: 'bg-blue-100 text-blue-600' };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const moveTask = (id, currentStatus) => {
    let nextStatus = 'issues';
    if (currentStatus === 'issues') nextStatus = 'review';
    if (currentStatus === 'review') nextStatus = 'ready';
    if (currentStatus === 'ready') nextStatus = 'issues';
    setTasks(tasks.map(task => task.id === id ? { ...task, status: nextStatus } : task));
  };

  const columns = [
    { id: 'issues', label: 'ISSUES FOUND', color: 'bg-red-500' },
    { id: 'review', label: 'REVIEW', color: 'bg-yellow-500' },
    { id: 'ready', label: 'READY', color: 'bg-[#7b68ee]' }
  ];

  return (
    <div className="p-8 w-full">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Release Project</h1>
          <p className="text-sm text-gray-500 mt-1">Manage tasks and track progress.</p>
        </div>
        <form onSubmit={handleAddTask} className="flex gap-2">
          <input 
            type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Judul tugas baru..." className="border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee] w-64"
          />
          <button type="submit" className="bg-[#7b68ee] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors shadow-sm">
            + Add Task
          </button>
        </form>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {columns.map((col) => (
          <div key={col.id} className="border-b border-gray-100 last:border-0">
            <div className="bg-gray-50/50 px-6 py-3 flex items-center justify-between">
              <span className={`${col.color} text-white text-[10px] font-bold px-2 py-1 rounded`}>{col.label}</span>
              <span className="text-xs text-gray-400 font-bold">{tasks.filter(t => t.status === col.id).length} Tasks</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {tasks.filter(t => t.status === col.id).map((task) => (
                <li key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                    <span className="font-medium text-gray-800">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`${task.stageColor} text-[11px] font-bold px-3 py-1 rounded-md tracking-wider`}>{task.stage}</span>
                    <button onClick={() => moveTask(task.id, task.status)} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors font-bold">
                      Pindah &rarr;
                    </button>
                  </div>
                </li>
              ))}
              {tasks.filter(t => t.status === col.id).length === 0 && (
                <li className="px-6 py-8 text-center text-gray-400 text-sm italic">Belum ada tugas di kolom ini.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}