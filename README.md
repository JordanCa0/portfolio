# Portfolio OS

Personal portfolio website for me, styled as a Linux [Hyprland](https://hyprland.org/) desktop environment.

The site behaves like a desktop OS: navigate with a working terminal emulator or a Hyprland-style app launcher. Sections open as floating, draggable, resizable windows that snap to screen edges and corners like a real tiling window manager.

## Features

- **Window manager** — draggable, resizable, focusable windows with z-index stacking, minimize/maximize, and open/close animations
- **Hyprland-style snapping** — drag a window near an edge or corner to see a snap preview; drop to tile it into halves or quadrants. Two half-snapped windows form a true split-screen. Double-click the title bar to un-snap.
- **Terminal emulator** — type `help` to list commands. Supports `about`, `resume`, `projects`, `skills`, `contact`, `whoami`, `ls`, `github`, `linkedin`, `clear`, and command history with arrow keys.
- **App launcher** — sidebar panel listing all apps
- **Top bar** — live clock, fake system stats, light/dark theme toggle, social links
- **Light/dark mode** — warm parchment light theme by default, dark red/black theme via the toggle, persisted to localStorage
- **Responsive** — full desktop experience at ≥768px, simplified stacked layout on mobile
- **CSS-only wallpaper** — radial gradient with subtle SVG noise, no external images

## Tech stack

| Layer | Choice |
|-------|--------|
| Build tool | [Vite](https://vitejs.dev/) |
| Framework | React + TypeScript |
| Styling | Tailwind CSS (custom palette) |
| Animations | Framer Motion |
| Windows | react-rnd |
| Icons | lucide-react |
| Backend | None — fully static |

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Deployment

Planned: AWS S3 (static hosting) + CloudFront (CDN), mirrored to GitHub Pages.

## Links

- GitHub: [JordanCa0](https://github.com/JordanCa0)
- LinkedIn: [jordan-cao](https://www.linkedin.com/in/jordan-cao)
- Email: jordancao77@gmail.com
