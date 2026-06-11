import { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import type { AppDefinition, Size, SnapZone, WindowInstance } from '../../types';
import { detectSnapZone, snapZoneRect } from './snap';

interface WindowProps {
  win: WindowInstance;
  app: AppDefinition;
  focused: boolean;
  getDesktopSize: () => Size;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onMinimize: (id: string) => void;
  onUpdate: (id: string, patch: Partial<WindowInstance>) => void;
  onSnapPreview: (zone: SnapZone) => void;
  children: React.ReactNode;
}

const MIN_WIDTH = 320;
const MIN_HEIGHT = 220;

export default function Window({
  win,
  app,
  focused,
  getDesktopSize,
  onClose,
  onFocus,
  onMinimize,
  onUpdate,
  onSnapPreview,
  children,
}: WindowProps) {
  const Icon = app.icon;
  // Zone under the pointer during the current drag, applied on drop
  const dragZone = useRef<SnapZone>(null);

  const pointerZone = (e: MouseEvent | TouchEvent): SnapZone => {
    const point = 'touches' in e ? e.touches[0] : e;
    if (!point) return null;
    const desktop = getDesktopSize();
    // Desktop canvas starts below the top bar; convert to desktop coords
    const topOffset = window.innerHeight - desktop.height;
    return detectSnapZone(point.clientX, point.clientY - topOffset, desktop);
  };

  const unsnap = () => {
    if (!win.snapped || !win.restore) return;
    onUpdate(win.id, {
      snapped: null,
      position: win.restore.position,
      size: win.restore.size,
      restore: null,
    });
  };

  const toggleMaximize = () => {
    if (win.snapped === 'full') {
      unsnap();
      return;
    }
    onUpdate(win.id, {
      snapped: 'full',
      restore: win.restore ?? { position: win.position, size: win.size },
      ...snapZoneRect('full', getDesktopSize()),
    });
  };

  return (
    <Rnd
      position={win.position}
      size={win.size}
      minWidth={MIN_WIDTH}
      minHeight={MIN_HEIGHT}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{ zIndex: win.zIndex }}
      onDragStart={() => onFocus(win.id)}
      onDrag={(e) => {
        const zone = pointerZone(e as MouseEvent | TouchEvent);
        if (zone !== dragZone.current) {
          dragZone.current = zone;
          onSnapPreview(zone);
        }
      }}
      onDragStop={(_e, d) => {
        const zone = dragZone.current;
        dragZone.current = null;
        onSnapPreview(null);
        if (zone) {
          onUpdate(win.id, {
            snapped: zone,
            restore: win.restore ?? { position: win.position, size: win.size },
            ...snapZoneRect(zone, getDesktopSize()),
          });
        } else if (win.snapped) {
          // Dragged away from the edge: restore free size at the drop point
          onUpdate(win.id, {
            snapped: null,
            position: { x: d.x, y: d.y },
            size: win.restore?.size ?? win.size,
            restore: null,
          });
        } else {
          onUpdate(win.id, { position: { x: d.x, y: d.y } });
        }
      }}
      onResizeStart={() => onFocus(win.id)}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        onUpdate(win.id, {
          snapped: null,
          restore: null,
          position,
          size: { width: ref.offsetWidth, height: ref.offsetHeight },
        });
      }}
      onMouseDown={() => onFocus(win.id)}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className={`flex h-full w-full flex-col overflow-hidden rounded-lg border bg-glass shadow-2xl backdrop-blur-glass ${
          focused ? 'border-accent/60 shadow-accent/20' : 'border-edge'
        }`}
      >
        <div
          className="window-drag-handle flex h-9 shrink-0 select-none items-center gap-2 border-b border-edge bg-chrome px-3"
          onDoubleClick={unsnap}
        >
          <Icon size={14} className="text-accent-soft" />
          <span className="flex-1 truncate text-xs font-medium">{app.label}</span>
          <div className="flex items-center gap-2">
            <button
              aria-label="Minimize"
              onClick={() => onMinimize(win.id)}
              className="h-3 w-3 rounded-full bg-term-amber transition-transform hover:scale-125"
            />
            <button
              aria-label="Maximize"
              onClick={toggleMaximize}
              className="h-3 w-3 rounded-full bg-term-max transition-transform hover:scale-125"
            />
            <button
              aria-label="Close"
              onClick={() => onClose(win.id)}
              className="h-3 w-3 rounded-full bg-term-close transition-transform hover:scale-125"
            />
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </motion.div>
    </Rnd>
  );
}
