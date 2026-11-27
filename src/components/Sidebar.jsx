import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { id: 1, label: 'Home', to: '/' },
    { id: 2, label: 'Tasks', to: '/tasks' },
    { id: 3, label: 'Dashboards', to: '/dashboards' },
    { id: 4, label: 'Docs', to: '/docs' },
    { id: 5, label: 'Chat', to: '/chat' },
    { id: 6, label: 'Goals', to: '/goals' },
    { id: 7, label: 'Whiteboards', to: '/whiteboards' },
  ];

  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col rounded-l-3xl bg-white pt-6 border-r border-gray-100">
      <Link to="/" className="mb-5 flex items-center gap-2 px-6">
        <svg className="h-7 w-7 text-[#7b68ee]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V7h2v10zm5 0h-2V7h2v10z"/>
        </svg>
        <span className="text-lg font-extrabold tracking-tight text-[#2a2e34]">Trello Wannabe</span>
      </Link>

      <nav className="flex flex-col gap-1 px-6 pb-4 text-[15px] text-[#3d424a]">
        {navItems.map((item) => {
          const isActive = currentPath === item.to;
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`flex items-center gap-3 py-2 transition-colors hover:text-[#7b68ee] ${isActive ? 'font-bold text-[#7b68ee]' : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}