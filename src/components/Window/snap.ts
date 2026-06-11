import type { Position, Size, SnapZone } from '../../types';

export const EDGE_THRESHOLD = 80;
export const CORNER_THRESHOLD = 120;

export interface Rect {
  position: Position;
  size: Size;
}

/**
 * Detect the snap zone for a pointer at (x, y) within a desktop of the
 * given size. Corners win over edges.
 */
export function detectSnapZone(x: number, y: number, desktop: Size): SnapZone {
  const { width: w, height: h } = desktop;
  const nearLeft = x < CORNER_THRESHOLD;
  const nearRight = x > w - CORNER_THRESHOLD;
  const nearTop = y < CORNER_THRESHOLD;
  const nearBottom = y > h - CORNER_THRESHOLD;

  if (nearLeft && nearTop) return 'top-left';
  if (nearRight && nearTop) return 'top-right';
  if (nearLeft && nearBottom) return 'bottom-left';
  if (nearRight && nearBottom) return 'bottom-right';
  if (x < EDGE_THRESHOLD) return 'left';
  if (x > w - EDGE_THRESHOLD) return 'right';
  return null;
}

/** Target geometry for a snap zone. Halves/quadrants tile with no gap. */
export function snapZoneRect(zone: NonNullable<SnapZone>, desktop: Size): Rect {
  const { width: w, height: h } = desktop;
  const halfW = Math.floor(w / 2);
  const halfH = Math.floor(h / 2);
  switch (zone) {
    case 'left':
      return { position: { x: 0, y: 0 }, size: { width: halfW, height: h } };
    case 'right':
      return { position: { x: halfW, y: 0 }, size: { width: w - halfW, height: h } };
    case 'top-left':
      return { position: { x: 0, y: 0 }, size: { width: halfW, height: halfH } };
    case 'top-right':
      return { position: { x: halfW, y: 0 }, size: { width: w - halfW, height: halfH } };
    case 'bottom-left':
      return { position: { x: 0, y: halfH }, size: { width: halfW, height: h - halfH } };
    case 'bottom-right':
      return { position: { x: halfW, y: halfH }, size: { width: w - halfW, height: h - halfH } };
    case 'full':
      return { position: { x: 0, y: 0 }, size: { width: w, height: h } };
  }
}
