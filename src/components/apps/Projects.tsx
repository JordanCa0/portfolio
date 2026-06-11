import { ExternalLink, Lock } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  /** GitHub repo URL; omit for private/unpublished work */
  link?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Portfolio OS',
    description:
      'This site — a portfolio styled as a Hyprland desktop environment with a tiling window manager, edge/corner snapping, and a working terminal emulator.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    link: 'https://github.com/JordanCa0/portfolio',
  },
  {
    title: 'Donor Prediction & Segmentation Dashboard',
    description:
      'End-to-end predictive analytics workflow for donor outreach — modeling in Python, SQL pipelines, and Matplotlib/Power BI visualizations that communicate findings to non-technical stakeholders.',
    tech: ['Python', 'SQL', 'VBA', 'Power BI'],
  },
  {
    title: 'WSI Feature Extraction Research',
    description:
      'Machine learning research using Phikon-2 on Whole Slide Imaging data — 50,000+ features per slide, with CNN architectures optimized via evolutionary strategies for leaner, faster training.',
    tech: ['PyTorch', 'CNNs', 'Evolutionary Algorithms'],
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
          {p.link ? (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-accent-soft transition-colors hover:text-accent-hover"
            >
              <ExternalLink size={12} /> View on GitHub
            </a>
          ) : (
            <span className="mt-3 inline-flex items-center gap-1 text-xs text-body-muted">
              <Lock size={12} /> Private repo — code available on request
            </span>
          )}
        </article>
      ))}
    </div>
  );
}
