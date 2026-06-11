import { useEffect, useState } from 'react';
import { Github, Grip, Linkedin, Moon, Sun } from 'lucide-react';
import { GITHUB_URL, LINKEDIN_URL } from '../../apps';

interface TopBarProps {
  dark: boolean;
  onToggleTheme: () => void;
  onToggleLauncher: () => void;
}

const WORKSPACES = ['A', 'B', 'C', 'D', 'E'];

function formatTime(d: Date): string {
  let h = d.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
}

export default function TopBar({ dark, onToggleTheme, onToggleLauncher }: TopBarProps) {
  const [now, setNow] = useState(() => new Date());
  // Fake system stats, slowly animated around a baseline
  const [stats, setStats] = useState({ cpu: 7, ram: 38 });

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 1000);
    const load = setInterval(() => {
      setStats((s) => ({
        cpu: Math.min(24, Math.max(2, s.cpu + Math.floor(Math.random() * 7) - 3)),
        ram: Math.min(52, Math.max(30, s.ram + Math.floor(Math.random() * 5) - 2)),
      }));
    }, 2500);
    return () => {
      clearInterval(clock);
      clearInterval(load);
    };
  }, []);

  return (
    <header className="relative flex h-10 shrink-0 items-center gap-4 border-b border-edge bg-glass px-3 text-xs backdrop-blur-glass">
      <button
        onClick={onToggleLauncher}
        aria-label="App launcher"
        className="rounded p-1.5 text-accent-soft transition-colors hover:bg-accent/20 hover:text-body"
      >
        <Grip size={16} />
      </button>
      <span className="font-semibold text-accent-soft">jordan@portfolio</span>
      <div className="hidden items-center gap-1.5 sm:flex">
        {WORKSPACES.map((w, i) => (
          <span
            key={w}
            className={`flex h-5 w-5 items-center justify-center rounded text-[10px] ${
              i === 0
                ? 'bg-accent text-body'
                : 'border border-edge text-body-muted'
            }`}
          >
            {w}
          </span>
        ))}
      </div>

      <span className="absolute left-1/2 -translate-x-1/2 font-medium tabular-nums">
        {formatTime(now)}
      </span>

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-body-muted md:inline tabular-nums">
          CPU {String(stats.cpu).padStart(2, ' ')}%
        </span>
        <span className="hidden text-body-muted md:inline tabular-nums">
          RAM {stats.ram}%
        </span>
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="rounded p-1.5 transition-colors hover:bg-accent/20"
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="rounded p-1.5 transition-colors hover:bg-accent/20 hover:text-accent-soft"
        >
          <Github size={14} />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="rounded p-1.5 transition-colors hover:bg-accent/20 hover:text-accent-soft"
        >
          <Linkedin size={14} />
        </a>
      </div>
    </header>
  );
}
