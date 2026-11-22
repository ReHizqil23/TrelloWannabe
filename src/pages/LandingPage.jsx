import { useState } from 'react';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import TodoList from '../components/TodoList';
import FetchData from '../components/FetchData';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-white text-[#292d34]">
      
      {/* HEADER / NAVBAR */}
      <header className="relative z-30 mx-auto flex h-[100px] max-w-[1220px] items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <svg className="h-8 w-8 text-[#7b68ee]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V7h2v10zm5 0h-2V7h2v10z"/>
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-[#292d34]">Trello Wannabe</span>
        </Link>
        
        <nav className="hidden items-center gap-9 text-sm font-bold lg:flex">
          <Link to="/solutions" className="flex items-center gap-2 hover:text-[#7b68ee] transition-colors">
              Solutions
              <img src="/assets/c9b93.svg" alt="" className="h-[7px] w-[10px]" />
          </Link>
          <Link to="/pricing" className="hover:text-[#7b68ee] transition-colors">Pricing</Link>
        </nav>
        
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/signup" className="inline-flex min-h-12 items-center justify-center rounded-lg px-7 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 bg-white text-[#7b68ee]">Sign Up</Link>
          <Link to="/login" className="rounded-lg bg-[#f4f5f7] px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors">Log in</Link>
        </div>
        
        {/* Tombol Mobile */}
        <button 
          type="button" 
          className="rounded-lg border border-[#7b68ee]/20 px-4 py-2 text-sm font-bold lg:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
        </button>
        
        {/* Menu Mobile */}
        <nav className={`absolute left-5 right-5 top-20 gap-4 rounded-2xl bg-white p-6 text-sm font-bold shadow-2xl border border-gray-100 lg:hidden ${isMenuOpen ? 'flex flex-col' : 'hidden'}`}>
          <Link to="/solutions" onClick={() => setIsMenuOpen(false)}>Solutions</Link>
          <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative mx-auto grid min-h-[650px] max-w-[1180px] items-center gap-12 px-5 pb-14 pt-5 lg:grid-cols-[440px_1fr]">
          <img src="/assets/e0479.svg" alt="" className="pointer-events-none absolute -right-[360px] -top-[330px] h-[1000px] w-[850px] opacity-95" />
          
          <div className="relative z-10">
            <h1 className="text-[48px] font-bold leading-[1.18] tracking-[-0.5px] sm:text-[58px]">
              One app to<br />replace them all.
            </h1>
            <p className="mt-6 text-sm font-medium">All your work in one place:</p>
            
            {/* MENU FITUR (Menggunakan Link React Router) */}
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/tasks" className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-3 text-xs font-bold shadow-[0_10px_20px_rgba(16,30,54,.08)] hover:shadow-lg hover:-translate-y-0.5 transition-all">Tasks<img src="/assets/8d1c5.svg" alt="" className="h-5 w-5" /></Link>
              <Link to="/whiteboards" className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-3 text-xs font-bold shadow-[0_10px_20px_rgba(16,30,54,.08)] hover:shadow-lg hover:-translate-y-0.5 transition-all">Whiteboards<img src="/assets/c002b.svg" alt="" className="h-5 w-5" /></Link>
              <Link to="/dashboards" className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-3 text-xs font-bold shadow-[0_10px_20px_rgba(16,30,54,.08)] hover:shadow-lg hover:-translate-y-0.5 transition-all">Dashboards<img src="/assets/523ed.svg" alt="" className="h-5 w-5" /></Link>
              <Link to="/chat" className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-3 text-xs font-bold shadow-[0_10px_20px_rgba(16,30,54,.08)] hover:shadow-lg hover:-translate-y-0.5 transition-all">Chat<img src="/assets/7f9e0.svg" alt="" className="h-5 w-5" /></Link>
              <Link to="/goals" className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-3 text-xs font-bold shadow-[0_10px_20px_rgba(16,30,54,.08)] hover:shadow-lg hover:-translate-y-0.5 transition-all">Goals<img src="/assets/9fb51.svg" alt="" className="h-5 w-5" /></Link>
              <Link to="/docs" className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-3 text-xs font-bold shadow-[0_10px_20px_rgba(16,30,54,.08)] hover:shadow-lg hover:-translate-y-0.5 transition-all">Docs<img src="/assets/c648b.svg" alt="" className="h-5 w-5" /></Link>
            </div>

            <form id="signup" className="mt-8 max-w-[440px]" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="sr-only">Work email</label>
              <input id="email" type="email" required placeholder="Enter your work email" className="h-14 w-full rounded-lg border border-[#b9bec7] px-5 text-sm shadow-sm outline-none focus:border-[#7b68ee] focus:ring-1 focus:ring-[#7b68ee]" />
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <button className="h-14 rounded-lg bg-[#7b68ee] px-8 text-sm font-bold text-white shadow-[0_10px_25px_rgba(123,104,238,.45)] hover:bg-purple-700 transition-colors" type="submit">
                  Get Started for Free
                </button>
                <p className="text-[10px] font-bold uppercase leading-4 tracking-wider text-[#b9bec7]">
                  Free forever.<br />No credit card.
                </p>
              </div>
            </form>
          </div>
          
          <div className="relative z-10 hidden lg:block">
            <img src="/assets/372c9.png" alt="Trello Wannabe workspace interface" className="w-full drop-shadow-2xl" />
          </div>
        </section>

        {/* SIMPLIFY SECTION */}
        <section className="mx-auto my-12 max-w-[1300px] rounded-[50px] bg-[#fff8fb] px-6 py-16 sm:px-12 lg:px-20">
          <div className="mb-10 flex flex-wrap gap-8 text-lg font-bold text-[#7c828d]">
            <span className="text-[#f4447d]">Project &amp; Tasks</span><span>Chat</span><span>Goals</span><span>Views</span>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <h2 className="text-4xl font-bold leading-tight sm:text-[54px]">Simplify work and get more done.</h2>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Plan, track, and manage any type of work with project management that flexes to your team's needs.
              </p>
              <div className="mt-8">
                <Link to="/signup" className="inline-flex min-h-12 items-center justify-center rounded-lg px-7 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 bg-[#7b68ee] text-white shadow-[#7b68ee]/25">Get Started</Link>
              </div>
            </div>
            <img src="/assets/34103.png" alt="Trello Wannabe project and task management" className="w-full drop-shadow-xl" />
          </div>
        </section>

        {/* SOLUTIONS SECTION */}
        <section id="solutions" className="mx-auto my-12 max-w-[1300px] rounded-[50px] bg-[#edfafe] px-6 py-16 sm:px-12 lg:px-20">
          <p className="text-center text-sm font-bold text-[#0096c7]">Built for everyone</p>
          <h2 className="mt-4 text-center text-4xl font-bold leading-tight sm:text-[60px]">
            Built for teams from 1 to 1,000+.
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-bold text-[#7c828d]">
            <span className="text-[#0096c7]">Project Management</span><span>Engineering</span><span>Sales</span><span>Marketing</span><span>Product</span><span>Design</span><span>Finance</span><span>HR</span><span>IT</span>
          </div>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div className="space-y-8">
              <article className="grid grid-cols-[42px_1fr] gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-bold text-[#0096c7] shadow">1</span>
                <div>
                  <h3 className="font-bold">Visualize &amp; Plan</h3>
                  <p className="mt-2 text-sm leading-6 text-[#58606e]">Manage any project from start to finish with highly customizable views that make project planning a breeze.</p>
                </div>
              </article>
              <article className="grid grid-cols-[42px_1fr] gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-bold text-[#0096c7] shadow">2</span>
                <div>
                  <h3 className="font-bold">Collaborate</h3>
                  <p className="mt-2 text-sm leading-6 text-[#58606e]">Work with your team in real-time with Chat, assigned comments, and notifications that bring everything together.</p>
                </div>
              </article>
              <article className="grid grid-cols-[42px_1fr] gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-bold text-[#0096c7] shadow">3</span>
                <div>
                  <h3 className="font-bold">Track Progress</h3>
                  <p className="mt-2 text-sm leading-6 text-[#58606e]">Add visual widgets for team members, tasks, sprints, time tracking, statuses, docs, embeds, and more.</p>
                </div>
              </article>
              <Link to="/signup" className="inline-flex min-h-12 items-center justify-center rounded-lg px-7 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 bg-[#7b68ee] text-white shadow-[#7b68ee]/25">Get Started</Link>
            </div>
            <img src="/assets/dd7be.png" alt="Trello Wannabe task view" className="w-full rounded-xl shadow-2xl" />
          </div>
        </section>

        {/* BOTTOM CTA SECTION */}
        <section className="relative mx-auto my-16 max-w-[1300px] overflow-hidden rounded-[50px] bg-gradient-to-r from-[#7b68ee] via-[#d43f8d] to-[#ff6b4a] px-6 py-16 text-white sm:px-12 lg:px-20">
          <img src="/assets/726f2.svg" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <svg className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V7h2v10zm5 0h-2V7h2v10z"/>
              </svg>
              <div>
                <h2 className="text-3xl font-extrabold sm:text-5xl">Trello Wannabe.</h2>
                <p className="mt-3">All of your work in one place: Tasks, Docs, Chat, Goals, &amp; more.</p>
              </div>
            </div>
            <Link to="/signup" className="inline-flex min-h-12 items-center justify-center rounded-lg px-7 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 bg-white text-[#7b68ee]">Free Forever</Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto flex max-w-[1220px] flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <svg className="h-6 w-6 text-[#7b68ee]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V7h2v10zm5 0h-2V7h2v10z"/>
              </svg>
              <span className="text-lg font-extrabold tracking-tight text-gray-800">Trello Wannabe</span>
            </Link>
            <p className="text-sm text-gray-500">
              © 2024 Hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>

      {/* SECTION TUGAS REACT HOOKS (Biar tugas dosen tetap ada) */}
      <section className="bg-gray-100 py-16 border-t border-gray-200">
        <div className="max-w-[1220px] mx-auto px-5">
          <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-800">Implementasi React Hooks</h2>
          <p className="text-center text-gray-500 mb-10">Tugas Eksplorasi useState dan useEffect</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Counter />
            <TodoList />
            <FetchData />
          </div>
        </div>
      </section>

    </div>
  );
}