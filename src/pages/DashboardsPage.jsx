import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import FetchData from '../components/FetchData';

export default function DashboardsPage() {
  return (
    <div className="min-h-screen bg-[#f1f2fb] p-6 font-sans">
      {/* Container Melayang */}
      <div className="mx-auto flex h-[calc(100vh-48px)] min-h-[720px] max-w-[1150px] overflow-hidden rounded-3xl bg-[#f6f7fb] shadow-xl">
        
        <main className="flex-1 overflow-y-auto bg-[#f8f9fc]">
          
          {/* Header */}
          <header className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
            <div>
              <h1 className="text-2xl font-bold text-[#2a2e34]">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-1">Pantau produktivitas dan tim kamu di sini.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-600">Halo, User!</span>
              <img src="https://i.pravatar.cc/150?u=me" alt="User" className="w-10 h-10 rounded-full border-2 border-[#7b68ee]" />
            </div>
          </header>
          
          {/* Area Widget Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Widget 1: Statis */}
              <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(30,40,80,0.08)] border border-gray-100 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Projects</p>
                  <h2 className="text-4xl font-extrabold text-[#2a2e34]">12</h2>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-500 font-bold">
                  <span>&uarr; 2 project baru bulan ini</span>
                </div>
              </div>

              {/* Widget 2: IMPLEMENTASI COUNTER */}
              <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(30,40,80,0.08)] border border-gray-100 flex flex-col items-center justify-center text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Sprint Points (useState)</p>
                <div className="w-full scale-110">
                  <Counter />
                </div>
              </div>

              {/* Widget 3: IMPLEMENTASI FETCH DATA */}
              <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(30,40,80,0.08)] border border-gray-100 row-span-2">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Team Members</p>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded">API</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Data dari useEffect</p>
                <div className="h-[300px] overflow-y-auto pr-2">
                  <FetchData />
                </div>
              </div>

              {/* Widget 4: Statis */}
              <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(30,40,80,0.08)] border border-gray-100 md:col-span-2">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Project Completion</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-100 rounded-full h-4">
                    <div className="bg-[#7b68ee] h-4 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="font-bold text-[#2a2e34]">75%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Tugas yang sudah diselesaikan minggu ini.</p>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}