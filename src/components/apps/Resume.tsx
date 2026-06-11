interface Entry {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}

const EXPERIENCE: Entry[] = [
  {
    title: 'Software Engineer',
    org: 'Acme Cloud Inc.',
    period: '2024 — Present',
    bullets: [
      'Build and operate backend services in TypeScript and Go serving 2M+ requests/day.',
      'Led migration of a legacy deployment pipeline to containerized CI/CD, cutting release time by 60%.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    org: 'Startup Labs',
    period: 'Summer 2023',
    bullets: [
      'Shipped a customer-facing analytics dashboard with React and PostgreSQL.',
      'Wrote integration tests that caught three production-blocking regressions before launch.',
    ],
  },
];

const EDUCATION: Entry[] = [
  {
    title: 'B.S. Computer Science',
    org: 'State University',
    period: '2020 — 2024',
    bullets: ['Coursework: distributed systems, operating systems, databases, algorithms.'],
  },
];

const CERTIFICATIONS: Entry[] = [
  {
    title: 'AWS Certified Solutions Architect — Associate',
    org: 'Amazon Web Services',
    period: '2025',
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
      <Section heading="Experience" entries={EXPERIENCE} />
      <Section heading="Education" entries={EDUCATION} />
      <Section heading="Certifications" entries={CERTIFICATIONS} />
    </div>
  );
}
