// src/pages/Dashboard.jsx
// Placeholder dashboard — shown after successful login

import { useNavigate } from "react-router-dom";
import GradientButton from "../components/GradientButton";

const stats = [
  { label: "Total Events",     value: "24",   sub: "+3 this month",  icon: "🗂️" },
  { label: "Active Students",  value: "1,284", sub: "Across 6 events", icon: "🎓" },
  { label: "Achievements",     value: "348",  sub: "+42 this week",  icon: "🏆" },
  { label: "Upcoming Events",  value: "7",    sub: "Next 30 days",   icon: "📅" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0a1e] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-lg text-white">Student Event Manager</span>
        </div>
        <GradientButton variant="outline" onClick={() => navigate("/login")}>
          Sign out
        </GradientButton>
      </div>

      {/* Welcome */}
      <div className="mb-8 animate-slide-up anim-hidden">
        <h1 className="font-display text-3xl font-bold text-white">
          Welcome back, Faculty! 👋
        </h1>
        <p className="text-white/40 mt-1">Here's what's happening with your events.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up anim-hidden delay-100">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl border border-white/8 p-5 shadow-card hover:border-violet-500/30 transition-colors">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="font-display text-2xl font-bold text-white">{s.value}</div>
            <div className="text-sm text-white/60 mt-0.5">{s.label}</div>
            <div className="text-xs text-violet-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Placeholder notice */}
      <div className="mt-12 glass rounded-2xl border border-violet-500/20 p-8 text-center animate-slide-up anim-hidden delay-200">
        <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-4 shadow-glow">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-2">Dashboard coming soon</h3>
        <p className="text-white/40 text-sm max-w-sm mx-auto">
          The full admin dashboard with event management, student tracking, and analytics is the next phase of this project.
        </p>
      </div>
    </div>
  );
}
