import type { LucideIcon } from 'lucide-react';

export type AppId =
  | 'terminal'
  | 'about'
  | 'resume'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'themes'
  | 'spotify'
  | 'help';

export type SnapZone =
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'full'
  | null;

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowInstance {
  id: string;
  appId: AppId;
  /** Index into WORKSPACES (0 = A … 4 = E) */
  workspace: number;
  zIndex: number;
  minimized: boolean;
  position: Position;
  size: Size;
  snapped: SnapZone;
  /** Free-floating geometry remembered while snapped, restored on un-snap. */
  restore: { position: Position; size: Size } | null;
}

export interface AppDefinition {
  id: AppId;
  label: string;
  icon: LucideIcon;
}
