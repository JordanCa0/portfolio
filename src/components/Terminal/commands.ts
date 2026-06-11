import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../../apps';
import type { AppId } from '../../types';

export interface CommandContext {
  openApp: (appId: AppId) => void;
}

export type CommandResult = { lines: string[] } | { clear: true };

export const COMMAND_DESCRIPTIONS: Array<{ cmd: string; desc: string }> = [
  { cmd: 'help', desc: 'List all available commands' },
  { cmd: 'about', desc: 'Open the About window' },
  { cmd: 'resume', desc: 'Open the Resume window' },
  { cmd: 'projects', desc: 'Open the Projects window' },
  { cmd: 'skills', desc: 'Open the Skills window' },
  { cmd: 'contact', desc: 'Open the Contact window' },
  { cmd: 'themes', desc: 'Open the theme picker' },
  { cmd: 'spotify', desc: 'Open the music player' },
  { cmd: 'whoami', desc: 'Print who I am' },
  { cmd: 'ls', desc: 'List available sections' },
  { cmd: 'clear', desc: 'Clear the terminal output' },
  { cmd: 'github', desc: 'Print my GitHub URL' },
  { cmd: 'linkedin', desc: 'Print my LinkedIn URL' },
];

const OPENABLE: AppId[] = [
  'about',
  'resume',
  'projects',
  'skills',
  'contact',
  'themes',
  'spotify',
];

export function executeCommand(input: string, ctx: CommandContext): CommandResult {
  const cmd = input.trim().toLowerCase();

  if (cmd === '') return { lines: [] };
  if (cmd === 'clear') return { clear: true };

  if ((OPENABLE as string[]).includes(cmd)) {
    ctx.openApp(cmd as AppId);
    return { lines: [`Opening ${cmd}...`] };
  }

  switch (cmd) {
    case 'help':
      return {
        lines: [
          'Available commands:',
          '',
          ...COMMAND_DESCRIPTIONS.map(
            ({ cmd: c, desc }) => `  ${c.padEnd(10)} ${desc}`,
          ),
        ],
      };
    case 'whoami':
      return { lines: ['Jordan Cao — Software Engineer'] };
    case 'ls':
      return {
        lines: [
          'drwxr-xr-x  about/',
          'drwxr-xr-x  projects/',
          'drwxr-xr-x  skills/',
          '-rw-r--r--  resume.pdf',
          '-rw-r--r--  contact.txt',
          '-rw-r--r--  help.md',
        ],
      };
    case 'github':
      return { lines: [GITHUB_URL] };
    case 'linkedin':
      return { lines: [LINKEDIN_URL] };
    case 'email':
      return { lines: [EMAIL] };
    default:
      return {
        lines: [
          `command not found: ${input.trim()}. Type 'help' for available commands.`,
        ],
      };
  }
}
