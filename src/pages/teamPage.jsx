import { useState, useEffect } from 'react';
import { initialTeamMembers } from '../data/teamMembers';

export default function TeamPage() {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('trello_wannabe_team');
    return saved ? JSON.parse(saved) : initialTeamMembers;
  });

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [division, setDivision] = useState("Engineering");

  useEffect(() => {
    localStorage.setItem('trello_wannabe_team', JSON.stringify(members));
  }, [members]);

  //Fungsi Tambah Anggota
  const handleInvite = (e) => {
    e.preventDefault();
    if (!name || !role) return;

    const newMember = {
      id: `m${Date.now()}`, // ID unik
      name: name,
      role: role,
      division: division,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}` // Avatar random
    };

    setMembers([...members, newMember]);
    
    // Reset form & tutup form
    setName("");
    setRole("");
    setDivision("Engineering");
    setShowForm(false);
  };

  const divisions = ['Engineering', 'Design', 'Product', 'Marketing'];

  return (
    <div className="p-8 w-full">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola anggota tim dan divisi mereka.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#7b68ee] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors shadow-sm"
        >
          {showForm ? 'Batal' : '+ Invite Member'}
        </button>
      </header>

      {/* FORM INVITE MEMBER */}
      {showForm && (
        <form onSubmit={handleInvite} className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-4 items-end animate-fade-in">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-gray-600 mb-1">Nama Lengkap</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee]" placeholder="Misal: Joko" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-gray-600 mb-1">Role / Jabatan</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee]" placeholder="Misal: Backend Dev" />
          </div>
          <div className="w-[180px]">
            <label className="block text-xs font-bold text-gray-600 mb-1">Divisi</label>
            <select value={division} onChange={(e) => setDivision(e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none bg-white focus:border-[#7b68ee]">
              {divisions.map(div => <option key={div} value={div}>{div}</option>)}
            </select>
          </div>
          <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors shadow-sm">
            Simpan
          </button>
        </form>
      )}

      <div className="space-y-8">
        {divisions.map(division => {
          const membersInDivision = members.filter(m => m.division === division);
          if (membersInDivision.length === 0) return null;

          return (
            <div key={division}>
              <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-200">{division} Division</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {membersInDivision.map(member => (
                  <div key={member.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full bg-gray-200" />
                    <div>
                      <h3 className="font-bold text-gray-800">{member.name}</h3>
                      <p className="text-xs text-gray-500 font-medium">{member.role}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold bg-[#7b68ee]/10 text-[#7b68ee] px-2 py-0.5 rounded">
                        {member.division}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}