export default function About() {
  return (
    <div className="flex flex-col items-center gap-5 p-8 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent bg-accent/20 text-3xl font-bold text-accent-soft">
        JC
      </div>
      <div>
        <h1 className="text-2xl font-bold">Jordan Cao</h1>
        <p className="text-sm text-accent-soft">Software Engineer</p>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-body-muted">
        I'm a software engineer who enjoys building things end to end — from
        backend services and cloud infrastructure to polished, interactive
        frontends like this one. I care about clean abstractions, fast feedback
        loops, and software that feels good to use. When I'm not coding, I'm
        usually tinkering with my Linux setup or exploring new tools.
      </p>
      <p className="text-xs text-body-muted">
        This site is a working desktop environment — open the terminal and type{' '}
        <span className="text-term-green">help</span> to explore.
      </p>
    </div>
  );
}
