import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f1f2fb] p-6 font-sans">
      <div className="mx-auto flex h-[calc(100vh-48px)] min-h-[720px] max-w-[1150px] overflow-hidden rounded-3xl bg-[#f6f7fb] shadow-xl">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#f8f9fc]">
          <Outlet /> { }
        </main>
      </div>
    </div>
  );
}