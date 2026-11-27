import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate('/tasks');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Kiri: Branding / Ilustrasi */}
      <div className="hidden lg:flex w-1/2 bg-[#7b68ee] flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Ornamen Background */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center text-white">
          <svg className="h-20 w-20 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V7h2v10zm5 0h-2V7h2v10z"/>
          </svg>
          <h1 className="text-4xl font-extrabold mb-4">Trello Wannabe</h1>
          <p className="text-lg text-white/80 max-w-md">Satu aplikasi untuk menggantikan semuanya. Kelola tugas, tim, dan project kamu dengan lebih rapi.</p>
        </div>
      </div>

      {/* Kanan: Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-[#7b68ee]">Trello Wannabe</h1>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Selamat Datang Kembali 👋</h2>
          <p className="text-sm text-gray-500 mb-8">Silakan masuk ke akun kamu untuk melanjutkan.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@kampus.ac.id"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm outline-none focus:border-[#7b68ee] focus:ring-2 focus:ring-[#7b68ee]/20 transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm outline-none focus:border-[#7b68ee] focus:ring-2 focus:ring-[#7b68ee]/20 transition-all"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                <input type="checkbox" className="rounded text-[#7b68ee] focus:ring-[#7b68ee]" />
                Ingat saya
              </label>
              <a href="#" className="font-bold text-[#7b68ee] hover:underline">Lupa password?</a>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#7b68ee] text-white py-3 rounded-lg font-bold hover:bg-[#6a58d8] transition-colors shadow-lg shadow-[#7b68ee]/30"
            >
              Masuk ke Workspace
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Belum punya akun? <Link to="/" className="font-bold text-[#7b68ee] hover:underline">Daftar sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
}