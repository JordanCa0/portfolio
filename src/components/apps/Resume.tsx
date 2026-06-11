import { Download } from 'lucide-react';

interface Entry {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}

const EXPERIENCE: Entry[] = [
  {
    title: 'Software Engineering Intern',
    org: 'Mercury — San Francisco, CA (Remote)',
    period: 'Jan 2026 — May 2026',
    bullets: [
      'Designed and implemented pause/unpause functionality for autotransfer rules in a large-scale Haskell fintech backend, spanning database schema changes, domain types, SQL queries, and API handlers across 140+ commits.',
      'Built database migrations and schema evolution for autotransfer rule lineage tracking — backfill scripts, NOT NULL constraint migrations, and a new pause table with indexing — ensuring zero-downtime deployments on production banking infrastructure.',
      'Extended type-safe Esqueleto SQL queries and domain model conversions to surface pause status and lineage data through the API, maintaining correctness via Haskell’s type system and comprehensive HSpec test suites.',
      'Contributed to partner bank rollover logic by implementing autotransfer disablement during account migrations, coordinating across service boundaries in a Nix-based monorepo with Temporal workflows.',
    ],
  },
  {
    title: 'Research Assistant — Machine Learning & Evolutionary Algorithms',
    org: 'Wilfrid Laurier University — Waterloo, ON',
    period: 'Sep 2025 — Jan 2026',
    bullets: [
      'Utilized Phikon-2 on a Whole Slide Imaging (WSI) dataset to extract 50,000+ high-dimensional features per slide, enabling faster downstream classification and more compact medical image representations.',
      'Optimized CNN architectures through iterative experimentation with evolutionary strategies, achieving a 20% reduction in redundant features and shorter training times without sacrificing accuracy.',
    ],
  },
  {
    title: 'Data Specialist',
    org: 'Wilfrid Laurier University — Waterloo, ON',
    period: 'Jan 2025 — Apr 2025',
    bullets: [
      'Leveraged Python and ML libraries (NumPy, Scikit-learn, PyTorch, Matplotlib) for predictive analytics and donor segmentation, identifying high-propensity prospects with ~85% accuracy.',
      'Created interactive dashboards and automated reporting tools using visualization libraries and structured SQL queries to support real-time analytics.',
      'Validated and cleaned 100,000+ alumni records, removing duplicates and resolving inconsistencies to improve data reliability for reporting.',
    ],
  },
];

const EDUCATION: Entry[] = [
  {
    title: 'BSc in Computer Science',
    org: 'Wilfrid Laurier University — Waterloo, ON',
    period: 'Class of 2026',
    bullets: [],
  },
];

function Section({ heading, entries }: { heading: string; entries: Entry[] }) {
  return (
    <section>
      <h2 className="mb-3 border-b border-edge pb-1 text-xs font-semibold uppercase tracking-widest text-accent-soft">
        {heading}
      </h2>
      <div className="space-y-4">
        {entries.map((e) => (
          <div key={e.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-sm font-semibold">{e.title}</h3>
              <span className="text-xs text-body-muted">{e.period}</span>
            </div>
            <p className="text-xs text-accent-soft">{e.org}</p>
            {e.bullets.length > 0 && (
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-xs leading-relaxed text-body-muted">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Resume() {
  return (
    <div className="space-y-7 p-6">
      <a
        href="/resume.pdf"
        download="Jordan_Cao_Resume.pdf"
        className="inline-flex items-center gap-2 rounded-lg border border-edge bg-chrome px-4 py-2 text-xs font-semibold transition-colors hover:border-accent hover:text-accent-soft"
      >
        <Download size={14} /> Download PDF
      </a>
      <Section heading="Experience" entries={EXPERIENCE} />
      <Section heading="Education" entries={EDUCATION} />
    </div>
  );
}
