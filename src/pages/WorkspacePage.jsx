import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import TodoList from '../components/TodoList';
import FetchData from '../components/FetchData';

export default function WorkspacePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1220px] mx-auto">
        
        {/* Header Halaman */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">My Workspace</h1>
            <p className="text-gray-500 mt-1">Ringkasan aktivitas dan tim kamu hari ini.</p>
          </div>
          <Link to="/" className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm">
            &larr; Kembali ke Home
          </Link>
        </div>

        {/* Grid Layout untuk Widget */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Widget 1: Counter (Sebagai Sprint Points / Story Points) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Sprint Points</h2>
            <p className="text-xs text-gray-400 mb-4">Total effort untuk sprint ini</p>
            {/* Komponen Counter ditaruh di sini */}
            <div className="w-full">
              <Counter />
            </div>
          </div>

          {/* Widget 2: TodoList (Sebagai Quick Notes) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Quick Notes</h2>
            <p className="text-xs text-gray-400 mb-4">Catatan cepat sebelum jadi tugas</p>
            {/* Komponen TodoList ditaruh di sini */}
            <div className="w-full">
              <TodoList />
            </div>
          </div>

          {/* Widget 3: FetchData (Sebagai Team Members) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Team Members</h2>
            <p className="text-xs text-gray-400 mb-4">Anggota tim dari API</p>
            {/* Komponen FetchData ditaruh di sini */}
            <div className="w-full">
              <FetchData />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}