const CATEGORIES: Array<{ name: string; items: string[] }> = [
  {
    name: 'Languages',
    items: [
      'Haskell',
      'Java',
      'Python',
      'C/C++',
      'SQL',
      'JavaScript',
      'TypeScript',
      'HTML/CSS',
      'VBA',
      'Assembly',
    ],
  },
  {
    name: 'Frameworks & Libraries',
    items: [
      'React',
      'Node.js',
      'Esqueleto',
      'Persistent',
      'HSpec',
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
    ],
  },
  {
    name: 'Tools',
    items: [
      'Git',
      'Nix',
      'Docker',
      'PostgreSQL',
      'Temporal',
      'Power BI',
      'GHCi',
      'Cursor',
      'Claude Code',
    ],
  },
  {
    name: 'Cloud & Data',
    items: ['AWS', 'Supabase', 'AI/ML', 'CNNs', 'Image Classification', 'Data Processing'],
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
