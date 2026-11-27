import { teamMembers } from '../data/teamMembers';

export default function TeamPage() {
  // Kelompokkan anggota berdasarkan divisi
  const divisions = ['Engineering', 'Design', 'Product', 'Marketing'];

  return (
    <div className="p-8 w-full">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola anggota tim dan divisi mereka.</p>
        </div>
        <button className="bg-[#7b68ee] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors shadow-sm">
          + Invite Member
        </button>
      </header>

      <div className="space-y-8">
        {divisions.map(division => {
          const membersInDivision = teamMembers.filter(m => m.division === division);
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