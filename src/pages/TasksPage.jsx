import { Link } from 'react-router-dom';
import { useState } from 'react';
// Komponen Sidebar

function Sidebar() {
  const navItems = [
    { id: 1, label: 'Home', to: '/' },
    { id: 2, label: 'Notifications', to: '/notifications' },
    { id: 3, label: 'Goals', to: '/goals' },
  ];

  return (
    <aside className="w-[240px] border-r border-gray-200 bg-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-5 flex items-center gap-2 border-b border-gray-100">
        <svg className="h-6 w-6 text-[#7b68ee]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V7h2v10zm5 0h-2V7h2v10z"/>
        </svg>
        <span className="font-extrabold text-gray-800">Trello Wannabe</span>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Menu</p>
        <nav className="space-y-1 mb-6">
          {navItems.map((item) => (
            <Link key={item.id} to={item.to} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <Link to="/" className="flex items-center justify-center w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
          &larr; Kembali ke Home
        </Link>
      </div>
    </aside>
  );
}

// Komponen Utama Halaman Tasks
export default function TasksPage() {
  // 1. STATE UNTUK MENYIMPAN SEMUA TUGAS
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Update contractor agreement', status: 'issues', stage: 'INITIATION', stageColor: 'bg-red-100 text-red-600' },
    { id: 2, title: 'Plan for next year', status: 'issues', stage: 'INITIATION', stageColor: 'bg-red-100 text-red-600' },
    { id: 3, title: 'Budget assessment', status: 'review', stage: 'PLANNING', stageColor: 'bg-purple-100 text-purple-600' },
    { id: 4, title: 'Finalize project scope', status: 'review', stage: 'EXECUTION', stageColor: 'bg-yellow-100 text-yellow-700' },
    { id: 5, title: 'New contractor agreement', status: 'ready', stage: 'PLANNING', stageColor: 'bg-purple-100 text-purple-600' },
  ]);

  // 2. STATE UNTUK INPUT FORM
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // 3. FUNGSI TAMBAH TUGAS (Mirip TodoList)
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(), // ID unik berdasarkan waktu
      title: newTaskTitle,
      status: 'issues', // Default masuk ke kolom Issues
      stage: 'NEW', 
      stageColor: 'bg-blue-100 text-blue-600'
    };

    setTasks([...tasks, newTask]); // Tambahkan ke array state
    setNewTaskTitle(""); // Reset input
  };

  // 4. FUNGSI PINDAH STATUS (Kanban Logic)
  const moveTask = (id, currentStatus) => {
    let nextStatus = 'issues';
    if (currentStatus === 'issues') nextStatus = 'review';
    if (currentStatus === 'review') nextStatus = 'ready';
    if (currentStatus === 'ready') nextStatus = 'issues'; // Balik ke awal

    // Update status tugas berdasarkan ID
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, status: nextStatus } : task
    );
    setTasks(updatedTasks);
  };

  // Pengaturan visual untuk tiap kolom
  const columns = [
    { id: 'issues', label: 'ISSUES FOUND', color: 'bg-red-500' },
    { id: 'review', label: 'REVIEW', color: 'bg-yellow-500' },
    { id: 'ready', label: 'READY', color: 'bg-[#7b68ee]' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <main className="flex-1 ml-[240px] p-8">
        <div className="max-w-6xl mx-auto">
          
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Release Project</h1>
              <p className="text-sm text-gray-500 mt-1">Manage tasks and track progress.</p>
            </div>
            
            {/* FORM TAMBAH TUGAS BARU */}
            <form onSubmit={handleAddTask} className="flex gap-2">
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Judul tugas baru..." 
                className="border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee] w-64"
              />
              <button type="submit" className="bg-[#7b68ee] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors shadow-sm">
                + Add Task
              </button>
            </form>
          </header>

          {/* DAFTAR TUGAS BERDASARKAN KOLOM */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {columns.map((col) => (
              <div key={col.id} className="border-b border-gray-100 last:border-0">
                
                {/* Header Kolom */}
                <div className="bg-gray-50/50 px-6 py-3 flex items-center justify-between">
                  <span className={`${col.color} text-white text-[10px] font-bold px-2 py-1 rounded`}>
                    {col.label}
                  </span>
                  <span className="text-xs text-gray-400 font-bold">
                    {tasks.filter(t => t.status === col.id).length} Tasks
                  </span>
                </div>
                
                {/* List Tugas di dalam Kolom */}
                <ul className="divide-y divide-gray-100">
                  {tasks.filter(t => t.status === col.id).map((task) => (
                    <li key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                        <span className="font-medium text-gray-800">{task.title}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className={`${task.stageColor} text-[11px] font-bold px-3 py-1 rounded-md tracking-wider`}>
                          {task.stage}
                        </span>
                        
                        {/* Tombol Pindah Status */}
                        <button 
                          onClick={() => moveTask(task.id, task.status)}
                          className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors font-bold"
                          title="Pindahkan ke status selanjutnya"
                        >
                          Pindah &rarr;
                        </button>
                      </div>
                    </li>
                  ))}
                  
                  {/* Jika kolom kosong */}
                  {tasks.filter(t => t.status === col.id).length === 0 && (
                    <li className="px-6 py-8 text-center text-gray-400 text-sm italic">
                      Belum ada tugas di kolom ini.
                    </li>
                  )}
                </ul>

              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}