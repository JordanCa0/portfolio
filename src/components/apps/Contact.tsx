import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE } from '../../apps';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — nothing to do
    }
  };

  return (
    <div className="flex flex-col gap-5 p-8">
      <h1 className="text-lg font-bold">Get in touch</h1>
      <p className="text-sm text-body-muted">
        The fastest way to reach me is email. I'm also active on GitHub and
        LinkedIn.
      </p>

      <div className="flex items-center gap-2 rounded-lg border border-edge bg-chrome p-3">
        <Mail size={16} className="shrink-0 text-accent-soft" />
        <code className="flex-1 truncate text-sm">{EMAIL}</code>
        <button
          onClick={copyEmail}
          aria-label="Copy email address"
          className="flex items-center gap-1.5 rounded border border-edge px-2.5 py-1.5 text-xs transition-colors hover:border-accent hover:text-accent-soft"
        >
          {copied ? <Check size={13} className="text-term-max" /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-edge bg-chrome p-3">
        <Phone size={16} className="shrink-0 text-accent-soft" />
        <code className="flex-1 truncate text-sm">{PHONE}</code>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-edge bg-chrome px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent-soft"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-edge bg-chrome px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent-soft"
        >
          <Linkedin size={16} /> LinkedIn
        </a>
      </div>
    </div>
  );
}
