import { useCallback, useEffect, useState } from 'react';
import { useWindowManager } from './hooks/useWindowManager';
import { useIsMobile } from './hooks/useIsMobile';
import type { AppId } from './types';
import TopBar from './components/TopBar/TopBar';
import Desktop from './components/Desktop/Desktop';
import AppLauncher from './components/AppLauncher/AppLauncher';
import Terminal from './components/Terminal/Terminal';
import MobileLayout from './components/MobileLayout';
import About from './components/apps/About';
import Resume from './components/apps/Resume';
import Projects from './components/apps/Projects';
import Skills from './components/apps/Skills';
import Contact from './components/apps/Contact';
import Help from './components/apps/Help';

export default function App() {
  const wm = useWindowManager();
  const isMobile = useIsMobile();
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Terminal opens (and focuses) on page load
  const { openWindow } = wm;
  useEffect(() => {
    if (!isMobile) openWindow('terminal');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderApp = useCallback(
    (appId: AppId) => {
      switch (appId) {
        case 'terminal':
          return <Terminal openApp={openWindow} />;
        case 'about':
          return <About />;
        case 'resume':
          return <Resume />;
        case 'projects':
          return <Projects />;
        case 'skills':
          return <Skills />;
        case 'contact':
          return <Contact />;
        case 'help':
          return <Help />;
      }
    },
    [openWindow],
  );

  if (isMobile) {
    return <MobileLayout dark={dark} onToggleTheme={() => setDark((d) => !d)} />;
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <TopBar
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
        onToggleLauncher={() => setLauncherOpen((o) => !o)}
      />
      <div className="relative flex min-h-0 flex-1 flex-col">
        <Desktop wm={wm} renderApp={renderApp} />
        <AppLauncher
          open={launcherOpen}
          onClose={() => setLauncherOpen(false)}
          onLaunch={openWindow}
        />
      </div>
    </div>
  );
}
