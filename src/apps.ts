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

// Swap the track id for any Spotify track/album/playlist embed URL
export const SPOTIFY_EMBED_URL =
  'https://open.spotify.com/embed/track/4PTG3Z6ehGkBFwjybzWkR8?utm_source=generator';
