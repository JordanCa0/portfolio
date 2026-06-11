export default function About() {
  return (
    <div className="flex flex-col items-center gap-5 p-8 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent bg-accent/20 text-3xl font-bold text-accent-soft">
        JC
      </div>
      <div>
        <h1 className="text-2xl font-bold">Jordan Cao</h1>
        <p className="text-sm text-accent-soft">
          Software Engineer · CS @ Wilfrid Laurier · Boba Enjoyer
        </p>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-body-muted">
        I'm a computer science student at Wilfrid Laurier University, most
        recently a software engineering intern at Mercury working on a
        large-scale Haskell fintech backend. I've also done machine learning
        research with evolutionary algorithms and medical imaging. I like type systems,
        clean abstractions, and software that feels good to use — like this
        desktop you're clicking around in.
      </p>
      <p className="text-xs text-body-muted">
        This site is a working desktop environment — open the terminal and type{' '}
        <span className="text-term-green">help</span> to explore.
      </p>
    </div>
  );
}
