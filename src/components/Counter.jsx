import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md text-center border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">1. Counter</h2>
      <p className="text-5xl font-extrabold text-[#7b68ee] mb-6">{count}</p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setCount(count - 1)} 
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold text-xl">
          -
        </button>
        <button 
          onClick={() => setCount(count + 1)} 
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-xl">
          +
        </button>
      </div>
    </div>
  );
}