import { useState, useEffect } from 'react';
import FetchData from '../components/FetchData';

export default function DashboardsPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('trello_wannabe_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'ready').length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="p-8 w-full">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#2a2e34]">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Pantau produktivitas dan data tim kamu di sini.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Total Tasks (Dinamis) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Tasks</p>
            <h2 className="text-4xl font-extrabold text-[#2a2e34]">{totalTasks}</h2>
          </div>
          <div className="mt-4 flex items-center text-sm text-[#7b68ee] font-bold">
            <span>Trello Task</span>
          </div>
        </div>

        {/* Widget 2: Progress Bar (Dinamis) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Task Completion</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-100 rounded-full h-4">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="font-bold text-[#2a2e34]">{progressPercentage}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">{completedTasks} dari {totalTasks} tugas selesai.</p>
        </div>

        {/* Widget 3: Fetch Data Team Members */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 row-span-2">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Team Members (API)</p>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded">useEffect</span>
          </div>
          <div className="h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <FetchData />
          </div>
        </div>

      </div>
    </div>
  );
}