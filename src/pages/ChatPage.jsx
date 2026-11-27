import { useEffect, useRef, useState } from 'react';

/* ---------- Data Dummy Awal ---------- */
const members = [
  { id: 'me', name: 'You', avatar: 'https://i.pravatar.cc/80?img=32', online: true },
  { id: 'ivan', name: 'Ivan', avatar: 'https://i.pravatar.cc/80?img=11', online: true },
  { id: 'maria', name: 'Maria', avatar: 'https://i.pravatar.cc/80?img=45', online: true },
  { id: 'brendan', name: 'Brendan', avatar: 'https://i.pravatar.cc/80?img=13', online: false },
  { id: 'brian', name: 'Brian', avatar: 'https://i.pravatar.cc/80?img=52', online: false },
];

const initialChannels = [
  { id: 'general', name: 'general', type: 'channel', unread: 0, topic: 'Company-wide announcements' },
  { id: 'podcast', name: 'podcast-series', type: 'channel', unread: 3, topic: 'Overview and development of our original podcast' },
  { id: 'design', name: 'design-review', type: 'channel', unread: 0, topic: 'Share work in progress' },
  { id: 'ivan', name: 'Ivan', type: 'dm', memberId: 'ivan', unread: 1 },
];

const initialMessages = {
  general: [
    { id: 1, authorId: 'brian', text: 'Reminder: sprint planning starts at 10 AM tomorrow.', time: '09:12' },
    { id: 2, authorId: 'maria', text: 'Noted. I will bring the updated roadmap.', time: '09:15', reactions: [{ emoji: '+1', count: 2 }] },
  ],
  podcast: [
    { id: 1, authorId: 'ivan', text: 'I have a lot of ideas for this! Do we have an overview somewhere for what the development plan entails?', time: '14:50' },
    { id: 2, authorId: 'maria', text: 'This is the start of the overview for the first podcast, let me know what you think!', time: '14:52', attachment: { name: 'podcast-overview.pdf', size: '248 KB' } },
  ],
  design: [
    { id: 1, authorId: 'maria', text: 'Uploaded the new dashboard mockups. Feedback by Friday please.', time: '11:03' },
  ],
  ivan: [
    { id: 1, authorId: 'ivan', text: 'Can you review my task before the standup?', time: '08:40' },
  ],
};

const getMember = (id) => members.find((m) => m.id === id);

/* ---------- Sidebar (Dengan Fitur Tambah Kontak) ---------- */
function ChatSidebar({ channels, activeId, onSelect }) {
  const [query, setQuery] = useState('');
  const [showNewChatMenu, setShowNewChatMenu] = useState(false);

  const filtered = channels.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const sections = [
    { id: 'channels', title: 'Channels', items: filtered.filter((c) => c.type === 'channel') },
    { id: 'dms', title: 'Direct Messages', items: filtered.filter((c) => c.type === 'dm') },
  ];

  return (
    <aside className="relative flex w-[280px] shrink-0 flex-col border-r border-[#eceef2] bg-white">
      <div className="flex items-center justify-between px-5 pb-3 pt-6">
        <span className="text-lg font-extrabold tracking-tight text-[#2a2e34]">Chat Room</span>
        
        {/* Tombol Tambah Kontak */}
        <button
          type="button"
          onClick={() => setShowNewChatMenu(!showNewChatMenu)}
          className="grid h-8 w-8 place-items-center rounded-md bg-[#7b68ee] text-lg leading-none text-white transition hover:bg-[#6a58d8]"
        >
          +
        </button>
      </div>

      {/* Dropdown Daftar Anggota untuk Chat Baru */}
      {showNewChatMenu && (
        <div className="absolute right-5 top-16 z-50 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          <p className="mb-2 px-2 text-xs font-bold text-gray-400 uppercase">Mulai Chat Baru</p>
          <ul className="max-h-60 overflow-y-auto">
            {members.filter(m => m.id !== 'me').map(member => (
              <li key={member.id}>
                <button
                  onClick={() => {
                    onSelect(member); // Panggil fungsi buat DM baru
                    setShowNewChatMenu(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-100"
                >
                  <img src={member.avatar} className="h-8 w-8 rounded-full" alt={member.name} />
                  <span className="text-sm font-medium">{member.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="px-5 pb-4">
        <div className="flex h-10 items-center gap-2 rounded-md bg-[#eceef3] px-3">
          <span className="h-3 w-3 rounded-full border border-[#8b92a0]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="w-full bg-transparent text-xs text-[#2a2e34] outline-none placeholder:text-[#9aa1ad]"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {sections.map((section) => (
          <div key={section.id} className="mb-5">
            <p className="mb-1 px-2 text-[11px] font-bold uppercase tracking-wider text-[#9aa1ad]">
              {section.title}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const member = item.type === 'dm' ? getMember(item.memberId) : null;
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.id)}
                      className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition ${
                        isActive ? 'bg-[#ece9ff] font-semibold text-[#6a58d8]' : 'text-[#3d424a] hover:bg-[#f4f5f9]'
                      }`}
                    >
                      {member ? (
                        <span className="relative">
                          <img src={member.avatar} alt={member.name} className="h-6 w-6 rounded-full object-cover" />
                          <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${member.online ? 'bg-[#0fb87f]' : 'bg-[#c9ccd3]'}`} />
                        </span>
                      ) : (
                        <span className="grid h-6 w-6 place-items-center text-base font-bold text-[#9aa1ad]">#</span>
                      )}
                      <span className="flex-1 truncate">{item.name}</span>
                    </button>
                  </li>
                );
              })}
              {section.items.length === 0 && (
                <li className="px-2 py-2 text-xs text-[#9aa1ad]">No results</li>
              )}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

/* ---------- Header ---------- */
function ChatHeader({ conversation }) {
  const member = conversation.type === 'dm' ? getMember(conversation.memberId) : null;
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#eceef2] bg-white px-6">
      <div className="flex items-center gap-3">
        {member ? (
          <img src={member.avatar} alt={member.name} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#ece9ff] text-lg font-bold text-[#6a58d8]">#</span>
        )}
        <div className="leading-tight">
          <h1 className="text-base font-bold text-[#2a2e34]">{conversation.name}</h1>
          <p className="text-xs text-[#8b92a0]">{member ? (member.online ? 'Online' : 'Offline') : conversation.topic}</p>
        </div>
      </div>
    </header>
  );
}

/* ---------- Message Item ---------- */
function MessageItem({ message }) {
  const author = getMember(message.authorId);
  const isMe = message.authorId === 'me';
  return (
    <li className="group flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-white/70">
      <img src={author.avatar} alt={author.name} className="mt-0.5 h-9 w-9 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 flex items-baseline gap-2">
          <span className="text-sm font-bold text-[#2a2e34]">{author.name}</span>
          <span className="text-[11px] text-[#9aa1ad]">{message.time}</span>
        </p>
        <div className={`inline-block max-w-[640px] rounded-xl px-4 py-2.5 text-[15px] leading-relaxed ${isMe ? 'bg-[#7b68ee] text-white' : 'bg-white text-[#2a2e34] shadow-[0_1px_4px_rgba(30,40,80,0.06)]'}`}>
          {message.text}
        </div>
      </div>
    </li>
  );
}

/* ---------- Composer ---------- */
function Composer({ placeholder, onSend }) {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSend(value);
    setText('');
  };
  return (
    <form onSubmit={handleSubmit} className="border-t border-[#eceef2] bg-white px-6 py-4">
      <div className="flex items-center gap-3 rounded-xl border border-[#d9dce3] bg-white px-4 py-2 focus-within:border-[#7b68ee]">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="h-10 flex-1 bg-transparent text-[15px] text-[#2a2e34] outline-none placeholder:text-[#9aa1ad]"
        />
        <button type="submit" disabled={!text.trim()} className="rounded-lg bg-[#7b68ee] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#6a58d8] disabled:opacity-40">
          Send
        </button>
      </div>
    </form>
  );
}

/* ---------- Page Utama ---------- */
export default function ChatPage() {
  // 1. Ambil Data dari LocalStorage (Channels & Messages)
  const [channels, setChannels] = useState(() => {
    const savedChannels = localStorage.getItem('trello_wannabe_channels');
    return savedChannels ? JSON.parse(savedChannels) : initialChannels;
  });

  const [messagesByChannel, setMessagesByChannel] = useState(() => {
    const savedMessages = localStorage.getItem('trello_wannabe_messages');
    return savedMessages ? JSON.parse(savedMessages) : initialMessages;
  });

  const [activeId, setActiveId] = useState(channels[0]?.id || 'general');

  // 2. Simpan Otomatis ke LocalStorage Jika Ada Perubahan
  useEffect(() => {
    localStorage.setItem('trello_wannabe_channels', JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem('trello_wannabe_messages', JSON.stringify(messagesByChannel));
  }, [messagesByChannel]);

  // 3. Logika Buka Chat dari Daftar Kontak
  const handleSelectMember = (member) => {
    // Cek apakah DM ke orang ini sudah ada
    const existingChannel = channels.find(c => c.type === 'dm' && c.memberId === member.id);
    
    if (existingChannel) {
      setActiveId(existingChannel.id); // Kalau sudah ada, buka chatnya
    } else {
      // Kalau belum ada, buat channel DM baru
      const newChannelId = `dm_${member.id}`;
      const newChannel = {
        id: newChannelId,
        name: member.name,
        type: 'dm',
        memberId: member.id,
        unread: 0
      };
      setChannels(prev => [...prev, newChannel]);
      setActiveId(newChannelId);
    }
  };

  // 4. Logika Kirim Pesan
  const handleSend = (text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    setMessagesByChannel((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), { id: Date.now(), authorId: 'me', text, time }],
    }));
  };

  const conversation = channels.find((c) => c.id === activeId);
  const messages = messagesByChannel[activeId] ?? [];

  // Jaga-jaga jika data kosong (misal baru dihapus)
  if (!conversation) return <div className="p-10 text-center">Pilih chat untuk mulai.</div>;

  return (
    <div className="flex h-full w-full overflow-hidden">
      <ChatSidebar 
        channels={channels} 
        activeId={activeId} 
        onSelect={(val) => {
          // Jika yang dipilih adalah object member (dari tombol +), jalankan handleSelectMember
          // Jika yang dipilih adalah ID string (dari list chat), ubah activeId langsung
          if (typeof val === 'object') {
            handleSelectMember(val);
          } else {
            setActiveId(val);
          }
        }} 
      />
      <section className="flex min-w-0 flex-1 flex-col bg-[#f8f9fc]">
        <ChatHeader conversation={conversation} />
        
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="my-4 flex items-center gap-4 text-[11px] font-bold text-[#9aa1ad]">
            <span className="h-px flex-1 bg-[#e3e5ea]" />TODAY<span className="h-px flex-1 bg-[#e3e5ea]" />
          </div>
          {messages.length === 0 ? (
            <p className="mt-16 text-center text-sm text-[#9aa1ad]">Belum ada pesan. Sapa dia!</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {messages.map((m) => <MessageItem key={m.id} message={m} />)}
            </ul>
          )}
        </div>

        <Composer
          key={activeId}
          placeholder={`Message ${conversation.type === 'channel' ? '#' : ''}${conversation.name}`}
          onSend={handleSend}
        />
      </section>
    </div>
  );
}