import {
  FileText,
  FolderOpen,
  HelpCircle,
  Mail,
  Music,
  Palette,
  Terminal,
  User,
  Zap,
} from 'lucide-react';
import type { AppDefinition, AppId } from './types';

export const APPS: AppDefinition[] = [
  { id: 'terminal', label: 'Terminal', icon: Terminal },
  { id: 'about', label: 'About', icon: User },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'themes', label: 'Themes', icon: Palette },
  { id: 'spotify', label: 'Spotify', icon: Music },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

export const APP_MAP: Record<AppId, AppDefinition> = Object.fromEntries(
  APPS.map((a) => [a.id, a]),
) as Record<AppId, AppDefinition>;

export const GITHUB_URL = 'https://github.com/JordanCa0';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/jordan-cao';
export const EMAIL = 'jordancao77@gmail.com';
export const PHONE = '647-383-8878';

// Paste any Spotify share link (track/album/playlist); the Spotify app
// converts it to the embeddable form automatically
export const SPOTIFY_URL =
  'https://open.spotify.com/track/23iKYWszFScsU02y1HJb92?si=36c6c5b7970544bc';
