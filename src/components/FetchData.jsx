import { useState, useEffect } from 'react';

export default function FetchData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedTeam = localStorage.getItem('trello_wannabe_team');
      
      if (savedTeam) {
        setUsers(JSON.parse(savedTeam));
      } else {
        setUsers([]);
      }
      
      setLoading(false); 
    }, 500);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []); 

  return (
    <div className="w-full">
      {loading ? (
        <div className="text-center py-8">
          <p className="text-[#7b68ee] font-bold animate-pulse">Memuat data tim...</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {users.length === 0 ? (
            <p className="text-sm text-gray-500 italic text-center py-4">Belum ada anggota tim. Tambah di halaman Team.</p>
          ) : (
            users.slice(0, 5).map((member) => (
              <li key={member.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-3">
                {/* Tampilkan Avatar */}
                {member.avatar && (
                  <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full bg-gray-200" />
                )}
                <div className="min-w-0">
                  {/* Tampilkan Nama & Role/Divisi (bukan email) */}
                  <p className="font-bold text-sm text-gray-800 truncate">{member.name}</p>
                  <p className="text-xs text-gray-500 truncate">{member.role} &bull; {member.division}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}