import { COMMAND_DESCRIPTIONS } from '../Terminal/commands';

export default function Help() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-bold">Terminal commands</h1>
      <p className="mt-2 text-sm text-body-muted">
        Open the Terminal app and type any of these commands:
      </p>
      <div className="mt-5 overflow-hidden rounded-lg border border-edge">
        {COMMAND_DESCRIPTIONS.map(({ cmd, desc }, i) => (
          <div
            key={cmd}
            className={`flex items-baseline gap-4 px-4 py-2.5 text-sm ${
              i % 2 === 0 ? 'bg-chrome' : ''
            }`}
          >
            <code className="w-24 shrink-0 text-term-green">{cmd}</code>
            <span className="text-xs text-body-muted">{desc}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-body-muted">
        Tip: windows can be dragged, resized, and snapped to screen edges and
        corners — just like a real tiling window manager.
      </p>
    </div>
  );
}
