import { useState } from 'react';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import FetchData from '../components/FetchData';

function Sidebar() {
  const [openFolders, setOpenFolders] = useState(['releases']);

  const mainNav = [
    { id: 1, label: 'Home', to: '/' },
    { id: 2, label: 'Notifications', to: '/notifications' },
    { id: 3, label: 'Goals', to: '/goals' },
  ];

  const spaces = [
    { id: 1, label: 'Everything', to: '/spaces/all', letter: null, color: '' },
    { id: 2, label: 'Development', to: '/spaces/development', letter: 'D', color: 'bg-[#7b68ee]' },
    { id: 3, label: 'Marketing', to: '/spaces/marketing', letter: 'M', color: 'bg-[#ffc400]' },
    { id: 4, label: 'Product', to: '/spaces/product', letter: 'P', color: 'bg-[#f2559f]', active: true },
  ];

  const folders = [
    {
      id: 'releases',
      label: 'Releases',
      to: '/folders/releases',
      docs: [{ id: 1, label: 'Demos', to: '/docs/demos' }],
    },
    { id: 'sprints', label: 'Sprints', to: '/folders/sprints', docs: [] },
  ];

  const toggleFolder = (id) =>
    setOpenFolders((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col rounded-l-3xl bg-white pt-6">
      {/* Brand */}
     <Link to="/" className="mb-5 flex items-center gap-2 px-6">
        <svg className="h-7 w-7 text-[#7b68ee]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V7h2v10zm5 0h-2V7h2v10z"/>
        </svg>
        <span className="text-xl font-extrabold tracking-tight text-[#2a2e34]">Trello Wannabe</span>
      </Link>

      {/* Main nav */}
      <nav className="flex flex-col gap-1 px-6 pb-4 text-[15px] text-[#3d424a]">
        {mainNav.map((item) => (
          <Link key={item.id} to={item.to} className="flex items-center gap-3 py-2 hover:text-[#7b68ee]">
            <span className="h-4 w-4 rounded-sm bg-[#c9ccd3]" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Spaces */}
      <div className="border-t border-[#eceef2] px-6 pt-4">
        <div className="mb-3 flex items-center justify-between text-[15px] font-semibold text-[#2a2e34]">
          Spaces
          <span className="text-[#8b92a0]">&#8964;</span>
        </div>

        <ul className="flex flex-col gap-1">
          {spaces.map((s) => (
            <li key={s.id}>
              <Link
                to={s.to}
                className={`flex items-center gap-3 py-2 text-[15px] hover:text-[#7b68ee] ${
                  s.active ? 'font-semibold text-[#2a2e34]' : 'text-[#3d424a]'
                }`}
              >
                {s.letter ? (
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-md text-xs font-bold text-white ${s.color}`}
                  >
                    {s.letter}
                  </span>
                ) : (
                  <span className="h-4 w-4 rounded-sm bg-[#c9ccd3]" />
                )}
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Folder tree */}
        <ul className="mt-4 flex flex-col gap-1 pl-3 text-[15px] text-[#3d424a]">
          {folders.map((folder) => {
            const isOpen = openFolders.includes(folder.id);
            return (
              <li key={folder.id}>
                <div className="flex items-center gap-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => toggleFolder(folder.id)}
                    className="w-3 text-[10px] text-[#8b92a0]"
                    aria-label={`Toggle ${folder.label}`}
                  >
                    {isOpen ? '\u25BE' : '\u25B8'}
                  </button>
                  <span className="h-4 w-4 rounded-sm border border-[#9aa1ad]" />
                  <Link to={folder.to} className="hover:text-[#7b68ee]">
                    {folder.label}
                  </Link>
                </div>

                {isOpen && (
                  <ul className="ml-9 flex flex-col gap-1">
                    {folder.docs.map((doc) => (
                      <li key={doc.id}>
                        <Link to={doc.to} className="flex items-center gap-2 py-1.5 hover:text-[#7b68ee]">
                          <span className="h-4 w-3.5 rounded-sm border border-[#9aa1ad]" />
                          {doc.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link to="/docs/new" className="flex items-center gap-2 py-1.5 hover:text-[#7b68ee]">
                        <span className="w-3.5 text-center">+</span>
                        New Doc
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

/* ---------- Top bar: filter + sort + view toggle ---------- */
function TopBar({ view, setView }) {
  const views = [
    { id: 'list', label: 'List view' },
    { id: 'grid', label: 'Grid view' },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex h-10 w-[236px] items-center gap-2 rounded-md bg-[#eceef3] px-3">
        <span className="h-3 w-3 rounded-full border border-[#8b92a0]" />
        <input
          type="text"
          placeholder="Filter by name"
          className="w-full bg-transparent text-xs text-[#2a2e34] outline-none placeholder:text-[#9aa1ad]"
        />
      </div>

      <div className="flex items-center gap-6 text-sm text-[#6b7280]">
        <button type="button" className="flex items-center gap-1">
          Date viewed <span className="text-xs">&#8964;</span>
        </button>

        <div className="flex items-center gap-3">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-label={v.label}
              onClick={() => setView(v.id)}
              className={`h-4 w-4 rounded-sm ${
                view === v.id ? 'bg-[#2a2e34]' : 'bg-[#9aa1ad]'
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

/* ---------- Folders ---------- */
function FolderSection() {
  const folders = [
    { id: 1, name: 'Releases', docs: 1, to: '/folders/releases', tint: 'bg-[#fff1e6]' },
    { id: 2, name: 'Sprints', docs: 0, to: '/folders/sprints', tint: 'bg-[#eef0fb]' },
  ];

  return (
    <section className="px-8 pt-4">
      <h2 className="mb-5 text-base font-bold text-[#2a2e34]">Folders</h2>

      <div className="flex flex-wrap gap-8">
        {folders.map((f) => (
          <article
            key={f.id}
            className="flex h-[54px] w-[318px] items-center justify-between rounded-lg bg-white px-3.5 shadow-[0_2px_8px_rgba(30,40,80,0.08)]"
          >
            <Link to={f.to} className="flex items-center gap-3">
              <span className={`h-7 w-7 rounded-md ${f.tint}`} />
              <span className="leading-tight">
                <span className="block text-[13px] font-bold text-[#2a2e34]">{f.name}</span>
                <span className="block text-[10px] text-[#8b92a0]">
                  {f.docs} {f.docs === 1 ? 'Doc' : 'Docs'}
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <button type="button" aria-label="Open folder" className="h-5 w-5 rounded bg-[#eceef3]" />
              <button type="button" aria-label="More options" className="text-xs text-[#6b7280]">
                &middot;&middot;&middot;
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Docs table ---------- */
function DocsTable() {
  const docs = [
    {
      id: 1,
      title: 'Demos',
      to: '/docs/demos',
      pages: 3,
      location: 'Releases',
      locationTo: '/folders/releases',
      updated: 'Monday at 8 AM',
    },
    {
      id: 2,
      title: 'The Declaration of Independence',
      to: '/docs/declaration-of-independence',
      pages: 1,
      location: 'Uncategorized',
      locationTo: '/folders/uncategorized',
      updated: 'Oct 27th at 9:23 PM',
    },
  ];

  const grid = 'grid grid-cols-[minmax(0,2.2fr)_70px_minmax(0,1.4fr)_minmax(0,1.2fr)_40px] items-center';

  return (
    <section className="px-8 pt-12">
      <h2 className="mb-5 text-base font-bold text-[#2a2e34]">Docs</h2>

      <div className={`${grid} mb-2 px-3.5 text-[11px] font-bold text-[#2a2e34]`}>
        <span>Docs</span>
        <span>Pages</span>
        <span>Located In</span>
        <span className="text-right">Last Updated</span>
        <span />
      </div>

      <ul className="flex flex-col gap-1.5">
        {docs.map((doc) => (
          <li
            key={doc.id}
            className={`${grid} h-11 rounded-md bg-white px-3.5 text-xs text-[#2a2e34] shadow-[0_1px_4px_rgba(30,40,80,0.06)]`}
          >
            <Link to={doc.to} className="flex items-center gap-3 hover:text-[#7b68ee]">
              <span className="h-4 w-4 rounded-sm bg-[#c9ccd3]" />
              <span className="truncate">{doc.title}</span>
            </Link>

            <span className="text-[#6b7280]">{doc.pages}</span>

            <Link
              to={doc.locationTo}
              className="flex w-fit items-center gap-1.5 rounded bg-[#eceef3] px-2 py-1 text-[11px] font-semibold"
            >
              <span className="h-3 w-3 rounded-sm border border-[#6b7280]" />
              {doc.location}
            </Link>

            <span className="text-right text-[11px] text-[#9aa1ad]">{doc.updated}</span>

            <button type="button" aria-label="More options" className="text-right text-[#9aa1ad]">
              &middot;&middot;&middot;
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Page ---------- */
export default function DocsDashboard() {
  const [view, setView] = useState('list');

  return (
    <div className="min-h-screen bg-[#f1f2fb] p-6 font-sans">
      <div className="mx-auto flex h-[calc(100vh-48px)] min-h-[720px] max-w-[1150px] overflow-hidden rounded-3xl bg-[#f6f7fb] shadow-xl">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <TopBar view={view} setView={setView} />
          <FolderSection />
          <DocsTable />
        </main>
      </div>
    </div>
  );
}
