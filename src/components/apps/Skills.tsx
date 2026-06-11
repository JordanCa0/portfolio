const CATEGORIES: Array<{ name: string; items: string[] }> = [
  {
    name: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'Bash'],
  },
  {
    name: 'Frameworks',
    items: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'Tools',
    items: ['Git', 'Docker', 'Linux', 'Neovim', 'PostgreSQL', 'Redis'],
  },
  {
    name: 'Cloud',
    items: ['AWS S3', 'CloudFront', 'Lambda', 'EC2', 'GitHub Actions'],
  },
];

export default function Skills() {
  return (
    <div className="space-y-6 p-6">
      {CATEGORIES.map((cat) => (
        <section key={cat.name}>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-soft">
            {cat.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-edge bg-chrome px-3 py-1 text-xs transition-colors hover:border-accent/60 hover:text-accent-soft"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
