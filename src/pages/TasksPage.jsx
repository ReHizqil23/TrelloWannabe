import { useState, useEffect } from 'react';
import { teamMembers } from '../data/teamMembers'; // Import data tim

export default function TasksPage() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('trello_wannabe_tasks');
    if (savedTasks) return JSON.parse(savedTasks);
    return [
      { id: 1, title: 'Update contractor agreement', status: 'issues', stage: 'Initiation', assignee: 'm1' },
      { id: 2, title: 'Plan for next year', status: 'issues', stage: 'Planning', assignee: 'm3' },
      { id: 3, title: 'Budget assessment', status: 'review', stage: 'Execution', assignee: 'm2' },
    ];
  });

  // State untuk form input
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newAssignee, setNewAssignee] = useState("");

  useEffect(() => {
    localStorage.setItem('trello_wannabe_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "") return;
    const newTask = { 
      id: Date.now(), 
      title: newTaskTitle, 
      status: 'issues', 
      stage: 'Initiation', 
      assignee: newAssignee || null 
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewAssignee("");
  };

  const moveTask = (id, currentStatus) => {
    let nextStatus = 'issues';
    if (currentStatus === 'issues') nextStatus = 'review';
    if (currentStatus === 'review') nextStatus = 'ready';
    if (currentStatus === 'ready') nextStatus = 'issues';
    setTasks(tasks.map(task => task.id === id ? { ...task, status: nextStatus } : task));
  };

  // Fungsi untuk mengubah Stage langsung dari dropdown di list
  const updateTaskStage = (id, newStage) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, stage: newStage } : task));
  };

  const columns = [
    { id: 'issues', label: 'ISSUES FOUND', color: 'bg-red-500' },
    { id: 'review', label: 'REVIEW', color: 'bg-yellow-500' },
    { id: 'ready', label: 'READY', color: 'bg-[#7b68ee]' }
  ];

  return (
    <div className="p-8 w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Release Project</h1>
        
        {/* FORM TAMBAH TUGAS */}
        <form onSubmit={handleAddTask} className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <input 
            type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Judul tugas baru..." className="flex-1 min-w-[200px] border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee]"
            required
          />
          <select 
            value={newAssignee} onChange={(e) => setNewAssignee(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none bg-white text-gray-600"
          >
            <option value="">-- Pilih Assignee --</option>
            {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <button type="submit" className="bg-[#7b68ee] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors shadow-sm">
            + Add Task
          </button>
        </form>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {columns.map((col) => (
          <div key={col.id} className="border-b border-gray-100 last:border-0">
            <div className="bg-gray-50/50 px-6 py-3 flex items-center justify-between">
              <span className={`${col.color} text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider`}>{col.label}</span>
              <span className="text-xs text-gray-400 font-bold">{tasks.filter(t => t.status === col.id).length} Tasks</span>
            </div>
            
            <ul className="divide-y divide-gray-100">
              {tasks.filter(t => t.status === col.id).map((task) => {
                const assignee = teamMembers.find(m => m.id === task.assignee);
                return (
                  <li key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                      <span className="font-medium text-gray-800 w-1/2 truncate">{task.title}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* Dropdown Stage */}
                      <select 
                        value={task.stage} 
                        onChange={(e) => updateTaskStage(task.id, e.target.value)}
                        className="text-[11px] font-bold px-2 py-1 rounded-md border border-gray-200 bg-gray-50 text-gray-700 outline-none cursor-pointer"
                      >
                        <option value="Initiation">Initiation</option>
                        <option value="Planning">Planning</option>
                        <option value="Execution">Execution</option>
                        <option value="Closing">Closing</option>
                      </select>

                      {/* Assignee Avatar */}
                      <div className="w-24 flex justify-center">
                        {assignee ? (
                          <div className="flex items-center gap-1">
                            <img src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full" title={assignee.name} />
                            <span className="text-[10px] font-bold text-gray-500 truncate max-w-[50px]">{assignee.name}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-400 italic">Unassigned</span>
                        )}
                      </div>
                      
                      <button onClick={() => moveTask(task.id, task.status)} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors font-bold w-20">
                        Pindah &rarr;
                      </button>
                    </div>
                  </li>
                );
              })}
              {tasks.filter(t => t.status === col.id).length === 0 && (
                <li className="px-6 py-6 text-center text-gray-400 text-sm italic">Belum ada tugas.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}