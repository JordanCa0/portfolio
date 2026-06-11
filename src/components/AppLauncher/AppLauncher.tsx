import { AnimatePresence, motion } from 'framer-motion';
import { APPS } from '../../apps';
import type { AppId } from '../../types';

interface AppLauncherProps {
  open: boolean;
  onClose: () => void;
  onLaunch: (appId: AppId) => void;
}

export default function AppLauncher({ open, onClose, onLaunch }: AppLauncherProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Click-away backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: -240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -240, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-2 top-2 z-50 w-52 rounded-lg border border-edge bg-glass p-2 shadow-2xl backdrop-blur-glass"
          >
            <p className="px-2 pb-2 pt-1 text-[10px] uppercase tracking-widest text-body-muted">
              Applications
            </p>
            <ul className="space-y-0.5">
              {APPS.map((app) => {
                const Icon = app.icon;
                return (
                  <li key={app.id}>
                    <button
                      onClick={() => {
                        onLaunch(app.id);
                        onClose();
                      }}
                      className="flex w-full items-center gap-3 rounded px-2 py-2 text-left text-sm transition-colors hover:bg-accent/25"
                    >
                      <Icon size={16} className="text-accent-soft" />
                      {app.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
