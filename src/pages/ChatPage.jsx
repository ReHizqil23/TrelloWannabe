import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
 
/* ---------- Dummy data ---------- */
const members = [
  { id: 'me', name: 'You', avatar: 'https://i.pravatar.cc/80?img=32', online: true },
  { id: 'ivan', name: 'Ivan', avatar: 'https://i.pravatar.cc/80?img=11', online: true },
  { id: 'maria', name: 'Maria', avatar: 'https://i.pravatar.cc/80?img=45', online: true },
  { id: 'brendan', name: 'Brendan', avatar: 'https://i.pravatar.cc/80?img=13', online: false },
  { id: 'brian', name: 'Brian', avatar: 'https://i.pravatar.cc/80?img=52', online: false },
];
 
const channels = [
  { id: 'general', name: 'general', type: 'channel', unread: 0, topic: 'Company-wide announcements' },
  { id: 'podcast', name: 'podcast-series', type: 'channel', unread: 3, topic: 'Overview and development of our original podcast' },
  { id: 'design', name: 'design-review', type: 'channel', unread: 0, topic: 'Share work in progress' },
  { id: 'ivan', name: 'Ivan', type: 'dm', memberId: 'ivan', unread: 1 },
  { id: 'maria', name: 'Maria', type: 'dm', memberId: 'maria', unread: 0 },
  { id: 'brendan', name: 'Brendan', type: 'dm', memberId: 'brendan', unread: 0 },
];
 
const initialMessages = {
  general: [
    { id: 1, authorId: 'brian', text: 'Reminder: sprint planning starts at 10 AM tomorrow.', time: '09:12' },
    { id: 2, authorId: 'maria', text: 'Noted. I will bring the updated roadmap.', time: '09:15', reactions: [{ emoji: '+1', count: 2 }] },
  ],
  podcast: [
    { id: 1, authorId: 'ivan', text: 'I have a lot of ideas for this! Do we have an overview somewhere for what the development plan entails?', time: '14:50' },
    {
      id: 2,
      authorId: 'maria',
      text: 'This is the start of the overview for the first podcast, let me know what you think!',
      time: '14:52',
      attachment: { name: 'podcast-overview.pdf', size: '248 KB' },
    },
    { id: 3, authorId: 'brendan', text: 'What time period is this covering? Could you please update overview to include a date range?', time: '14:58', reactions: [{ emoji: 'eyes', count: 1 }] },
  ],
  design: [
    { id: 1, authorId: 'maria', text: 'Uploaded the new dashboard mockups. Feedback by Friday please.', time: '11:03' },
  ],
  ivan: [
    { id: 1, authorId: 'ivan', text: 'Can you review my task before the standup?', time: '08:40' },
  ],
  maria: [],
  brendan: [],
};
 
const getMember = (id) => members.find((m) => m.id === id);
 
/* ---------- Sidebar ---------- */
function ChatSidebar({ activeId, onSelect }) {
  const [query, setQuery] = useState('');
 
  const filtered = channels.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );
 
  const sections = [
    { id: 'channels', title: 'Channels', items: filtered.filter((c) => c.type === 'channel') },
    { id: 'dms', title: 'Direct Messages', items: filtered.filter((c) => c.type === 'dm') },
  ];
 
  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-[#eceef2] bg-white">
      <div className="flex items-center justify-between px-5 pb-3 pt-6">
        <Link to="/" className="flex items-center gap-2">
          <svg className="h-7 w-7 text-[#7b68ee]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V7h2v10zm5 0h-2V7h2v10z"/>
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-[#2a2e34]">Trello Wannabe</span>
        </Link>
        <button
          type="button"
          aria-label="New message"
          className="grid h-8 w-8 place-items-center rounded-md bg-[#7b68ee] text-lg leading-none text-white transition hover:bg-[#6a58d8]"
        >
          +
        </button>
      </div>
 
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
                        isActive
                          ? 'bg-[#ece9ff] font-semibold text-[#6a58d8]'
                          : 'text-[#3d424a] hover:bg-[#f4f5f9]'
                      }`}
                    >
                      {member ? (
                        <span className="relative">
                          <img src={member.avatar} alt={member.name} className="h-6 w-6 rounded-full object-cover" />
                          <span
                            className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${
                              member.online ? 'bg-[#0fb87f]' : 'bg-[#c9ccd3]'
                            }`}
                          />
                        </span>
                      ) : (
                        <span className="grid h-6 w-6 place-items-center text-base font-bold text-[#9aa1ad]">#</span>
                      )}
                      <span className="flex-1 truncate">{item.name}</span>
                      {item.unread > 0 && (
                        <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-[#f0386b] px-1.5 text-[11px] font-bold text-white">
                          {item.unread}
                        </span>
                      )}
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
  const actions = [
    { id: 1, label: 'Search in conversation', to: '/chat/search' },
    { id: 2, label: 'Pinned messages', to: '/chat/pinned' },
    { id: 3, label: 'Conversation info', to: '/chat/info' },
  ];
 
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
          <p className="text-xs text-[#8b92a0]">
            {member ? (member.online ? 'Online' : 'Offline') : conversation.topic}
          </p>
        </div>
      </div>
 
      <div className="flex items-center gap-4">
        {conversation.type === 'channel' && (
          <ul className="flex -space-x-2">
            {members.slice(0, 4).map((m) => (
              <li key={m.id}>
                <img src={m.avatar} alt={m.name} className="h-7 w-7 rounded-full border-2 border-white object-cover" />
              </li>
            ))}
          </ul>
        )}
        {actions.map((a) => (
          <Link
            key={a.id}
            to={a.to}
            aria-label={a.label}
            className="h-5 w-5 rounded bg-[#c9ccd3] transition hover:bg-[#7b68ee]"
          />
        ))}
      </div>
    </header>
  );
}
 
/* ---------- Message ---------- */
function MessageItem({ message }) {
  const author = getMember(message.authorId);
  const isMe = message.authorId === 'me';
 
  return (
    <li className="group flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-white/70">
      <img src={author.avatar} alt={author.name} className="mt-0.5 h-9 w-9 rounded-full object-cover" />
 
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 flex items-baseline gap-2">
          <Link to={`/members/${author.id}`} className="text-sm font-bold text-[#2a2e34] hover:underline">
            {author.name}
          </Link>
          <span className="text-[11px] text-[#9aa1ad]">{message.time}</span>
        </p>
 
        <div
          className={`inline-block max-w-[640px] rounded-xl px-4 py-2.5 text-[15px] leading-relaxed ${
            isMe ? 'bg-[#7b68ee] text-white' : 'bg-white text-[#2a2e34] shadow-[0_1px_4px_rgba(30,40,80,0.06)]'
          }`}
        >
          {message.text}
        </div>
 
        {message.attachment && (
          <div className="mt-2 flex w-[280px] items-center gap-3 rounded-lg bg-white p-3 shadow-[0_1px_4px_rgba(30,40,80,0.06)]">
            <span className="h-11 w-11 rounded-lg bg-[#7b68ee]" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold text-[#2a2e34]">{message.attachment.name}</p>
              <p className="text-xs text-[#9aa1ad]">{message.attachment.size}</p>
            </div>
          </div>
        )}
 
        {message.reactions && (
          <ul className="mt-2 flex gap-2">
            {message.reactions.map((r) => (
              <li
                key={r.emoji}
                className="flex items-center gap-1.5 rounded-full border border-[#d9d4ff] bg-[#f4f2ff] px-2.5 py-0.5 text-xs font-semibold text-[#6a58d8]"
              >
                <span>{r.emoji}</span>
                <span>{r.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
 
/* ---------- Message list ---------- */
function MessageList({ messages }) {
  const endRef = useRef(null);
 
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
 
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="my-4 flex items-center gap-4 text-[11px] font-bold text-[#9aa1ad]">
        <span className="h-px flex-1 bg-[#e3e5ea]" />
        TODAY
        <span className="h-px flex-1 bg-[#e3e5ea]" />
      </div>
 
      {messages.length === 0 ? (
        <p className="mt-16 text-center text-sm text-[#9aa1ad]">
          No messages yet. Say hello.
        </p>
      ) : (
        <ul className="flex flex-col gap-1">
          {messages.map((m) => (
            <MessageItem key={m.id} message={m} />
          ))}
        </ul>
      )}
 
      <div ref={endRef} />
    </div>
  );
}
 
/* ---------- Composer ---------- */
function Composer({ placeholder, onSend }) {
  const [text, setText] = useState('');
 
  const tools = [
    { id: 1, label: 'Attach file' },
    { id: 2, label: 'Mention' },
    { id: 3, label: 'Emoji' },
  ];
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSend(value);
    setText('');
  };
 
  return (
    <form onSubmit={handleSubmit} className="border-t border-[#eceef2] bg-white px-6 py-4">
      <div className="flex items-center gap-3 rounded-xl border border-[#d9dce3] bg-white px-4 py-2 focus-within:border-[#7b68ee] focus-within:ring-2 focus-within:ring-[#7b68ee]/20">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="h-10 flex-1 bg-transparent text-[15px] text-[#2a2e34] outline-none placeholder:text-[#9aa1ad]"
        />
 
        <div className="flex items-center gap-3">
          {tools.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-label={t.label}
              className="h-5 w-5 rounded bg-[#c9ccd3] transition hover:bg-[#7b68ee]"
            />
          ))}
        </div>
 
        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded-lg bg-[#7b68ee] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#6a58d8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </form>
  );
}
 
/* ---------- Page ---------- */
export default function ChatPage() {
  const [activeId, setActiveId] = useState('podcast');
  const [messagesByChannel, setMessagesByChannel] = useState(initialMessages);
 
  const conversation = channels.find((c) => c.id === activeId);
  const messages = messagesByChannel[activeId] ?? [];
 
  const handleSend = (text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    setMessagesByChannel((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), { id: Date.now(), authorId: 'me', text, time }],
    }));
  };
 
  return (
    <div className="min-h-screen bg-[#f1f2fb] p-6 font-sans">
      <div className="mx-auto flex h-[calc(100vh-48px)] min-h-[640px] max-w-[1200px] overflow-hidden rounded-3xl bg-[#f6f7fb] shadow-xl">
        <ChatSidebar activeId={activeId} onSelect={setActiveId} />
 
        <section className="flex min-w-0 flex-1 flex-col">
          <ChatHeader conversation={conversation} />
          <MessageList messages={messages} />
          <Composer
            key={activeId}
            placeholder={`Message ${conversation.type === 'channel' ? '#' : ''}${conversation.name}`}
            onSend={handleSend}
          />
        </section>
      </div>
    </div>
  );
}
 