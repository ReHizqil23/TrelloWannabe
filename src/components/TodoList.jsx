import { useState } from 'react';

export default function TodoList() {
  const [tugas, setTugas] = useState([]);
  const [input, setInput] = useState("");

  const tambahTugas = (e) => {
    e.preventDefault();
    if (input === "") return;
    setTugas([...tugas, input]);
    setInput(""); 
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">2. To-Do List</h2>
      <form onSubmit={tambahTugas} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik tugas..." 
          className="border border-gray-300 p-2 rounded-lg flex-1 outline-none focus:border-[#7b68ee]" 
        />
        <button type="submit" className="bg-[#7b68ee] text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700">Tambah</button>
      </form>
      <ul className="space-y-2 max-h-40 overflow-y-auto">
        {tugas.map((item, index) => (
          <li key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
  );
}