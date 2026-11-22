import { useState, useEffect } from 'react';

export default function FetchData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []); 

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">3. Fetch Data Dummy</h2>
      {loading ? (
        <p className="text-[#7b68ee] font-bold animate-pulse">Sedang memuat data dari API...</p>
      ) : (
        <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {users.slice(0, 5).map(user => (
            <li key={user.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-bold text-gray-800">{user.name}</span> <br/>
              <span className="text-xs text-gray-500">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}