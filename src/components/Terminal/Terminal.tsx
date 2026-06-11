import { useEffect, useRef, useState } from 'react';
import type { AppId } from '../../types';
import { executeCommand } from './commands';

interface TerminalProps {
  openApp: (appId: AppId) => void;
}

interface Line {
  type: 'input' | 'output' | 'boot';
  text: string;
}

const PROMPT = 'jordan@portfolio:~$';

const BOOT_LINES: Line[] = [
  { type: 'boot', text: 'Welcome to jordan@portfolio' },
  { type: 'boot', text: "Type 'help' to see available commands." },
  { type: 'boot', text: '─────────────────────────────────────' },
];

export default function Terminal({ openApp }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>(BOOT_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-focus on mount, auto-scroll on new output
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const value = input;
    setInput('');
    setHistoryIdx(-1);
    if (value.trim()) setHistory((h) => [value, ...h]);

    const result = executeCommand(value, { openApp });
    if ('clear' in result) {
      setLines([]);
      return;
    }
    setLines((ls) => [
      ...ls,
      { type: 'input', text: value },
      ...result.lines.map((text): Line => ({ type: 'output', text })),
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, history.length - 1);
      if (idx >= 0 && history[idx] !== undefined) {
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = historyIdx - 1;
      setHistoryIdx(idx);
      setInput(idx >= 0 ? history[idx] : '');
    }
  };

  return (
    <div
      ref={scrollRef}
      className="h-full cursor-text overflow-y-auto p-3 text-[13px] leading-relaxed"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) =>
        line.type === 'input' ? (
          <div key={i} className="whitespace-pre-wrap break-words">
            <span className="text-term-green">jordan@portfolio</span>
            <span className="text-body-muted">:</span>
            <span className="text-term-pink">~</span>
            <span className="text-body-muted">$ </span>
            {line.text}
          </div>
        ) : (
          <div
            key={i}
            className={`whitespace-pre-wrap break-words ${
              line.type === 'boot' ? 'text-accent-soft' : ''
            }`}
          >
            {line.text || ' '}
          </div>
        ),
      )}
      <div className="flex">
        <span className="shrink-0">
          <span className="text-term-green">jordan@portfolio</span>
          <span className="text-body-muted">:</span>
          <span className="text-term-pink">~</span>
          <span className="text-body-muted">$&nbsp;</span>
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent caret-term-pink outline-none"
          spellCheck={false}
          autoComplete="off"
          aria-label={PROMPT}
        />
      </div>
    </div>
  );
}
