import { useCallback, useRef, useState } from 'react';
import type { AppId, WindowInstance } from '../types';

const DEFAULT_SIZE = { width: 700, height: 500 };

export interface WindowManager {
  windows: WindowInstance[];
  focusedId: string | null;
  openWindow: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  updateWindow: (id: string, patch: Partial<WindowInstance>) => void;
  clearFocus: () => void;
}

export function useWindowManager(): WindowManager {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const zCounter = useRef(10);
  const idCounter = useRef(1);

  const openWindow = useCallback((appId: AppId) => {
    setWindows((ws) => {
      const existing = ws.find((w) => w.appId === appId);
      if (existing) {
        setFocusedId(existing.id);
        return ws.map((w) =>
          w.id === existing.id
            ? { ...w, minimized: false, zIndex: ++zCounter.current }
            : w,
        );
      }
      const id = `win-${idCounter.current++}`;
      // Slightly randomized spawn so windows don't stack perfectly
      const maxX = Math.max(40, window.innerWidth - DEFAULT_SIZE.width - 80);
      const maxY = Math.max(40, window.innerHeight - DEFAULT_SIZE.height - 120);
      const position = {
        x: Math.min(60 + ws.length * 36 + Math.floor(Math.random() * 100), maxX),
        y: Math.min(30 + ws.length * 28 + Math.floor(Math.random() * 60), maxY),
      };
      setFocusedId(id);
      return [
        ...ws,
        {
          id,
          appId,
          zIndex: ++zCounter.current,
          minimized: false,
          position,
          size: { ...DEFAULT_SIZE },
          snapped: null,
          restore: null,
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setFocusedId(id);
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, zIndex: ++zCounter.current } : w)),
    );
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)),
    );
  }, []);

  const updateWindow = useCallback(
    (id: string, patch: Partial<WindowInstance>) => {
      setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w)));
    },
    [],
  );

  const clearFocus = useCallback(() => setFocusedId(null), []);

  return {
    windows,
    focusedId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    updateWindow,
    clearFocus,
  };
}
