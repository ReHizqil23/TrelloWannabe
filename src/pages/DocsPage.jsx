import { useState, useEffect } from 'react';

export default function DocsPage() {
  // 1. STATE UNTUK MENYIMPAN DOKUMEN (Tersimpan di localStorage)
  const [docs, setDocs] = useState(() => {
    const savedDocs = localStorage.getItem('trello_wannabe_docs');
    if (savedDocs) return JSON.parse(savedDocs);
    return [
      { id: 1, title: 'Demos', folder: 'Releases', updated: 'Monday at 8 AM' },
      { id: 2, title: 'Project Roadmap', folder: 'Sprints', updated: 'Oct 27th at 9:23 PM' },
    ];
  });

  // 2. STATE UNTUK FORM INPUT
  const [newTitle, setNewTitle] = useState("");
  const [newFolder, setNewFolder] = useState("Uncategorized");

  // 3. SIMPAN KE LOCALSTORAGE SETIAP KALI ADA PERUBAHAN
  useEffect(() => {
    localStorage.setItem('trello_wannabe_docs', JSON.stringify(docs));
  }, [docs]);

  // 4. FUNGSI TAMBAH DOKUMEN
  const handleAddDoc = (e) => {
    e.preventDefault();
    if (newTitle.trim() === "") return;

    const newDoc = {
      id: Date.now(),
      title: newTitle,
      folder: newFolder || "Uncategorized",
      updated: 'Baru saja'
    };

    setDocs([...docs, newDoc]);
    setNewTitle(""); // Reset form
    setNewFolder("Uncategorized");
  };

  // 5. FUNGSI HAPUS DOKUMEN
  const handleDeleteDoc = (id) => {
    // Konfirmasi sebelum menghapus
    if (window.confirm("Yakin mau hapus dokumen ini?")) {
      setDocs(docs.filter(doc => doc.id !== id));
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      
      {/* --- SIDEBAR KHUSUS DOCS --- */}
      <aside className="flex h-full w-[240px] shrink-0 flex-col border-r border-[#eceef2] bg-white pt-6">
        <div className="px-6 pb-4">
          <h2 className="text-lg font-bold text-gray-800">Spaces</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2 cursor-pointer hover:text-[#7b68ee]"><span className="text-gray-400">•</span> Everything</li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-[#7b68ee]"><span className="w-4 h-4 bg-purple-500 text-white rounded text-[10px] flex items-center justify-center font-bold">D</span> Development</li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-[#7b68ee]"><span className="w-4 h-4 bg-yellow-500 text-white rounded text-[10px] flex items-center justify-center font-bold">M</span> Marketing</li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-[#7b68ee]"><span className="w-4 h-4 bg-pink-500 text-white rounded text-[10px] flex items-center justify-center font-bold">P</span> Product</li>
          </ul>
        </div>

        <div className="px-6 pt-4 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Folders</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2 cursor-pointer hover:text-[#7b68ee]">
              <span>📁</span> Releases
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-[#7b68ee]">
              <span>📁</span> Sprints
            </li>
          </ul>
        </div>
      </aside>

      {/* --- KONTEN UTAMA DOCS --- */}
      <main className="flex-1 overflow-y-auto bg-[#f8f9fc] p-8">
        
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#2a2e34] mb-4">Documents</h1>
          
          {/* FORM TAMBAH DOKUMEN BARU */}
          <form onSubmit={handleAddDoc} className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <input 
              type="text" 
              placeholder="Judul dokumen baru..." 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 min-w-[200px] border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee]"
              required
            />
            <select 
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-[#7b68ee] bg-white"
            >
              <option value="Uncategorized">Uncategorized</option>
              <option value="Releases">Releases</option>
              <option value="Sprints">Sprints</option>
            </select>
            <button 
              type="submit" 
              className="bg-[#7b68ee] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors shadow-sm"
            >
              + Add Document
            </button>
          </form>
        </header>

        {/* LIST DOKUMEN (Bukan Tabel Lagi) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="flex-1">Document Name</div>
            <div className="w-32">Located In</div>
            <div className="w-40 text-right">Last Updated</div>
            <div className="w-16 text-center">Action</div>
          </div>

          <ul className="divide-y divide-gray-100">
            {docs.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-xl">📄</span>
                  <span className="font-bold text-[#2a2e34]">{doc.title}</span>
                </div>
                <div className="w-32">
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {doc.folder}
                  </span>
                </div>
                <div className="w-40 text-right text-xs text-gray-400 font-medium">
                  {doc.updated}
                </div>
                <div className="w-16 text-center">
                  <button 
                    onClick={() => handleDeleteDoc(doc.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                    title="Hapus Dokumen"
                  >
                    {/* Ikon Tempat Sampah SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {docs.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              Belum ada dokumen. Silakan tambah di atas.
            </div>
          )}
        </div>

      </main>
    </div>
  );
}