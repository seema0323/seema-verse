import React from 'react';

interface ProjectArtProps {
  id: string;
  themeColor: string;
}

export const ProjectArt: React.FC<ProjectArtProps> = ({ id, themeColor }) => {
  switch (id) {
    case 'ai-personalized-learning':
      return (
        <div className="relative w-full h-full min-h-[260px] bg-gradient-to-br from-[#0a1128] via-[#090b17] to-[#120e2e] flex items-center justify-center overflow-hidden p-6">
          {/* Neural synaptic nodes & cognitive wave */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <svg className="w-full h-48 opacity-80" viewBox="0 0 400 200" fill="none">
            {/* Neural pathways */}
            <path d="M 40 100 Q 120 40 200 100 T 360 100" stroke={themeColor} strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
            <path d="M 40 100 Q 120 160 200 100 T 360 100" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.7" />
            <path d="M 120 40 L 200 160 L 280 40" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
            {/* Synaptic nodes */}
            <circle cx="40" cy="100" r="6" fill="#06b6d4" filter="drop-shadow(0 0 8px #06b6d4)" />
            <circle cx="120" cy="40" r="7" fill="#8b5cf6" filter="drop-shadow(0 0 10px #8b5cf6)" />
            <circle cx="200" cy="100" r="10" fill="#06b6d4" filter="drop-shadow(0 0 15px #06b6d4)" />
            <circle cx="280" cy="40" r="7" fill="#8b5cf6" filter="drop-shadow(0 0 10px #8b5cf6)" />
            <circle cx="360" cy="100" r="6" fill="#06b6d4" filter="drop-shadow(0 0 8px #06b6d4)" />
            <circle cx="200" cy="160" r="5" fill="#38bdf8" />
          </svg>
          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-[10px] font-mono text-cyan-300/80 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-cyan-500/20">
            <span>ADAPTIVE COGNITIVE PATHWAY</span>
            <span className="animate-pulse">● LIVE INFERENCE</span>
          </div>
        </div>
      );

    case 'student-dashboard':
      return (
        <div className="relative w-full h-full min-h-[260px] bg-gradient-to-br from-[#120d2b] via-[#090a16] to-[#0c162e] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0 bg-grid-pattern opacity-15" />
          <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
            {/* Attendance Bar Chart / Analytics */}
            <rect x="60" y="90" width="28" height="70" rx="4" fill="#8b5cf6" opacity="0.8" />
            <rect x="110" y="60" width="28" height="100" rx="4" fill="#a855f7" />
            <rect x="160" y="40" width="28" height="120" rx="4" fill="#c084fc" filter="drop-shadow(0 0 10px rgba(168,85,247,0.5))" />
            <rect x="210" y="75" width="28" height="85" rx="4" fill="#8b5cf6" opacity="0.8" />
            <rect x="260" y="50" width="28" height="110" rx="4" fill="#06b6d4" />
            <rect x="310" y="80" width="28" height="80" rx="4" fill="#38bdf8" opacity="0.8" />
            {/* Baseline trend curve */}
            <path d="M 60 90 Q 160 30 260 50 T 340 75" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 3" />
          </svg>
          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-[10px] font-mono text-purple-300/90 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-purple-500/20">
            <span>METRIC TELEMETRY & ATTENDANCE</span>
            <span>MODULAR VIEW</span>
          </div>
        </div>
      );

    case 'tripora':
      return (
        <div className="relative w-full h-full min-h-[260px] bg-gradient-to-br from-[#06201a] via-[#081017] to-[#0d1e2e] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0 bg-grid-pattern opacity-15" />
          <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
            {/* Topographic contours & Waypoint compass */}
            <path d="M 20 150 Q 120 70 220 120 T 380 90" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
            <path d="M 20 120 Q 140 40 240 100 T 380 60" stroke="#34d399" strokeWidth="1.5" opacity="0.8" />
            <circle cx="240" cy="100" r="14" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="240" cy="100" r="4" fill="#34d399" filter="drop-shadow(0 0 8px #10b981)" />
            {/* Compass diamond */}
            <polygon points="120,70 125,85 120,100 115,85" fill="#10b981" />
            <polygon points="120,70 125,85 120,100 115,85" stroke="#34d399" strokeWidth="0.5" />
          </svg>
          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-[10px] font-mono text-emerald-300/90 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-emerald-500/20">
            <span>DYNAMIC ITINERARY & TOPOGRAPHY</span>
            <span>ROUTING ENGINE</span>
          </div>
        </div>
      );

    case 'hotel-booking-app':
      return (
        <div className="relative w-full h-full min-h-[260px] bg-gradient-to-br from-[#241406] via-[#0e0a14] to-[#1a1226] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0 bg-grid-pattern opacity-15" />
          <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
            {/* Architectural room reservation grid */}
            <rect x="70" y="50" width="110" height="90" rx="6" stroke="#f59e0b" strokeWidth="1.5" fill="rgba(245,158,11,0.05)" />
            <line x1="125" y1="50" x2="125" y2="140" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
            <rect x="220" y="50" width="110" height="90" rx="6" stroke="#fbbf24" strokeWidth="1.5" fill="rgba(251,191,36,0.05)" />
            <circle cx="275" cy="95" r="16" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="275" cy="95" r="5" fill="#f59e0b" filter="drop-shadow(0 0 8px #f59e0b)" />
          </svg>
          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-[10px] font-mono text-amber-300/90 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-amber-500/20">
            <span>ROOM INVENTORY & RESERVATION ENGINE</span>
            <span>RESPONSIVE BOOKING</span>
          </div>
        </div>
      );

    case 'cloud-monitor-dashboard':
      return (
        <div className="relative w-full h-full min-h-[260px] bg-gradient-to-br from-[#24081c] via-[#0b0817] to-[#120822] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0 bg-grid-pattern opacity-15" />
          <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
            {/* Server Rack Matrix & Oscilloscope wave */}
            <path d="M 30 110 L 80 110 L 110 50 L 140 150 L 170 80 L 200 120 L 250 120 L 280 60 L 310 140 L 370 110" stroke="#ec4899" strokeWidth="2" fill="none" filter="drop-shadow(0 0 8px #ec4899)" />
            <circle cx="110" cy="50" r="4" fill="#f472b6" />
            <circle cx="280" cy="60" r="4" fill="#f472b6" />
          </svg>
          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-[10px] font-mono text-pink-300/90 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-pink-500/20">
            <span>TELEMETRY STREAM & CLUSTER HEALTH</span>
            <span>REAL-TIME STATUS</span>
          </div>
        </div>
      );

    case 'smart-age-calculator':
      return (
        <div className="relative w-full h-full min-h-[260px] bg-gradient-to-br from-[#1b0a29] via-[#090818] to-[#0e162e] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0 bg-grid-pattern opacity-15" />
          <svg className="w-full h-48" viewBox="0 0 400 200" fill="none">
            {/* Chronological orbital rings */}
            <circle cx="200" cy="100" r="70" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="8 4" className="animate-spin" style={{ animationDuration: '40s' }} />
            <circle cx="200" cy="100" r="45" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
            <circle cx="200" cy="100" r="20" stroke="#e9d5ff" strokeWidth="1" />
            <circle cx="245" cy="100" r="5" fill="#a855f7" filter="drop-shadow(0 0 10px #a855f7)" />
            <circle cx="160" cy="70" r="4" fill="#38bdf8" />
          </svg>
          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-center text-[10px] font-mono text-purple-300/90 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-purple-500/20">
            <span>CHRONOLOGICAL TEMPORAL ENGINE</span>
            <span>SECOND TICKER</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-48 bg-[#0e0f1d] flex items-center justify-center text-zinc-500 font-mono text-xs">
          PROJECT VISUAL
        </div>
      );
  }
};
