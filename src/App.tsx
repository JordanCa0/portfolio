import { useCallback, useEffect, useState } from 'react';
import { useWindowManager } from './hooks/useWindowManager';
import { useIsMobile } from './hooks/useIsMobile';
import type { AppId } from './types';
import { applyTheme, getTheme, loadThemeId } from './themes';
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
import Themes from './components/apps/Themes';
import Spotify from './components/apps/Spotify';
import Help from './components/apps/Help';

export default function App() {
  const wm = useWindowManager();
  const isMobile = useIsMobile();
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [themeId, setThemeId] = useState(loadThemeId);
  const theme = getTheme(themeId);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme.id);
  }, [theme]);

  // Quick toggle between the two signature themes; the Themes app has the rest
  const toggleTheme = () => setThemeId(theme.dark ? 'parchment' : 'crimson');

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
        case 'themes':
          return <Themes currentId={themeId} onSelect={setThemeId} />;
        case 'spotify':
          return <Spotify />;
        case 'help':
          return <Help />;
      }
    },
    [openWindow, themeId],
  );

  if (isMobile) {
    return (
      <MobileLayout
        dark={theme.dark}
        onToggleTheme={toggleTheme}
        themeId={themeId}
        onSelectTheme={setThemeId}
      />
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <TopBar
        dark={theme.dark}
        onToggleTheme={toggleTheme}
        onToggleLauncher={() => setLauncherOpen((o) => !o)}
        activeWorkspace={wm.activeWorkspace}
        occupiedWorkspaces={new Set(wm.windows.map((w) => w.workspace))}
        onSwitchWorkspace={wm.switchWorkspace}
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
