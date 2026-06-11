import { ExternalLink } from 'lucide-react';
import { GITHUB_URL } from '../../apps';

interface Project {
  title: string;
  description: string;
  tech: string[];
}

const PROJECTS: Project[] = [
  {
    title: 'Portfolio OS',
    description:
      'This site — a portfolio styled as a Hyprland desktop environment with a tiling window manager, snapping, and a working terminal emulator.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    title: 'Queueflow',
    description:
      'A lightweight distributed task queue with at-least-once delivery, dead-letter handling, and a real-time monitoring dashboard.',
    tech: ['Go', 'Redis', 'Docker', 'gRPC'],
  },
  {
    title: 'Shelfware',
    description:
      'Self-hosted home media catalog that scans local libraries, fetches metadata, and serves a fast searchable UI.',
    tech: ['Node.js', 'SQLite', 'React', 'Tailwind'],
  },
];

export default function Projects() {
  return (
    <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((p) => (
        <article
          key={p.title}
          className="flex flex-col rounded-lg border border-edge bg-chrome p-4 transition-colors hover:border-accent/60"
        >
          <h3 className="text-sm font-semibold">{p.title}</h3>
          <p className="mt-2 flex-1 text-xs leading-relaxed text-body-muted">
            {p.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-edge px-2 py-0.5 text-[10px] text-accent-soft"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-xs text-accent-soft transition-colors hover:text-accent-hover"
          >
            <ExternalLink size={12} /> View on GitHub
          </a>
        </article>
      ))}
    </div>
  );
}
