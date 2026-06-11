# Portfolio OS — Implementation Plan

Personal portfolio website for **Jordan Cao**, styled as a Linux Hyprland desktop environment.

---

## Concept

The site behaves like a desktop OS. Users can navigate via a terminal emulator (typing commands) or a clickable Hyprland-style app launcher sidebar. Sections open as floating, draggable, resizable, snappable windows on a desktop canvas — like a real window manager.

---

## Visual Reference & Theme

Base aesthetic: https://github.com/binnewbs/arch-hyprland

### Color Palette (Dark Mode Default)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0d0505` | Desktop canvas |
| Panel/glass | `rgba(30, 8, 8, 0.85)` + `backdrop-filter: blur(12px)` | All panels/windows |
| Accent primary | `#8B1A1A` | Buttons, borders, highlights |
| Accent hover | `#c0392b` | Hover states |
| Accent soft | `#d4889a` | Dusty pink secondary accents |
| Text primary | `#f0d0d0` | Body text |
| Text secondary | `#a08080` | Muted/secondary text |
| Border | `rgba(180, 60, 60, 0.25)` | Panel/window borders |
| Window chrome | `rgba(20, 6, 6, 0.92)` | Title bars |

All colors defined in the custom Tailwind config — no hardcoded hex in components.

**Light mode:** Warm cream/parchment palette. Toggle lives in the top bar. Dark is default.

**Wallpaper:** CSS-only — deep dark red-to-black radial gradient with subtle noise texture. No external image.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Build tool | Vite |
| Framework | React + TypeScript |
| Styling | Tailwind CSS (custom palette config) |
| Animations | Framer Motion |
| Draggable/resizable windows | react-rnd |
| Icons | lucide-react |
| Backend | None — fully static |
| Deployment | S3 + CloudFront *(deferred — implement after site is complete)* |

---

## File Structure

```
portfolio/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TopBar/
│   │   │   └── TopBar.tsx
│   │   ├── Desktop/
│   │   │   └── Desktop.tsx
│   │   ├── AppLauncher/
│   │   │   └── AppLauncher.tsx
│   │   ├── Terminal/
│   │   │   ├── Terminal.tsx
│   │   │   └── commands.ts
│   │   ├── Window/
│   │   │   └── Window.tsx
│   │   └── apps/
│   │       ├── About.tsx
│   │       ├── Resume.tsx
│   │       ├── Projects.tsx
│   │       ├── Skills.tsx
│   │       ├── Contact.tsx
│   │       └── Help.tsx
│   ├── hooks/
│   │   └── useWindowManager.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.ts
├── vite.config.ts
├── README.md
├── plan.md
└── package.json
```

---

## Components

### TopBar

Fixed, full-width bar at the top. Frosted glass with `1px` bottom border.

- **Left:** `jordan@portfolio` label + decorative workspace dots (A B C D E)
- **Center:** Live clock — updates every second, `HH:MM AM/PM` format
- **Right:** Fake CPU/RAM stats (static or slowly animated), light/dark toggle, GitHub icon → `https://github.com/JordanCa0`, LinkedIn icon → `https://www.linkedin.com/in/jordan-cao`

---

### Desktop Canvas

Full viewport minus top bar. Wallpaper background. Renders all open `<Window>` components from the window manager state. Click on bare desktop deselects focus.

---

### App Launcher

Hyprland-style sidebar panel. Triggered by a launcher button in the top bar. Vertical list of apps — icon (lucide-react) + label. Clicking opens the corresponding window. Closes after selection. Frosted glass panel.

| Icon | Label |
|------|-------|
| `Terminal` | Terminal |
| `User` | About |
| `FileText` | Resume |
| `FolderOpen` | Projects |
| `Zap` | Skills |
| `Mail` | Contact |
| `HelpCircle` | Help |

---

### Window Manager (`useWindowManager` hook)

**State:** Array of `WindowInstance { id, appId, zIndex, minimized, position, size, snapped }`

**Actions:**
- `openWindow(appId)` — if already open, focus it; else add new instance at slightly randomized position
- `closeWindow(id)`
- `focusWindow(id)` — bring to top of z-index stack
- `minimizeWindow(id)` — toggle minimized

---

### Window Component

Wraps `react-rnd`.

**Title bar:**
- App icon + name (draggable handle)
- Three dot buttons: close (red `#c0392b`), minimize (amber), maximize (green) — macOS-style dots

**Defaults:** `700×500px`, randomized spawn position so windows don't stack perfectly.

**Animations:** Framer Motion `scale` + `opacity` on mount/unmount:
```
initial: { scale: 0.92, opacity: 0 }
animate: { scale: 1, opacity: 1 }
exit:    { scale: 0.92, opacity: 0 }
```

**Background:** Frosted glass.

---

### Window Snapping (Hyprland-style tiling)

During drag, detect proximity to screen edges/corners and show a snap preview overlay. On drop, snap the window to the target zone.

| Drop zone | Result |
|-----------|--------|
| Near left edge | Left 50% of desktop |
| Near right edge | Right 50% of desktop |
| Top-left corner | Top-left 25% quadrant |
| Top-right corner | Top-right 25% quadrant |
| Bottom-left corner | Bottom-left 25% quadrant |
| Bottom-right corner | Bottom-right 25% quadrant |
| Center / no edge | Free positioning |

**Snap threshold:** `80px` from edge, `120px` from corner.

**Snap preview:** `rgba(139, 26, 26, 0.25)` filled rectangle with accent border showing the target zone during drag.

**Un-snap:** Double-click title bar restores previous free size/position. Dragging away from the edge also un-snaps.

**Multi-window tiling:** Two half-screen snapped windows tile side by side with no gap — true split-screen.

---

### Terminal

Functional in-browser terminal emulator. Prompt: `jordan@portfolio:~$`

Input at bottom, scrollable output history above. Auto-scroll to bottom on new output. Auto-focused on page load. Monospace font with green/pink prompt color.

**Boot message:**
```
Welcome to jordan@portfolio
Type 'help' to see available commands.
─────────────────────────────────────
```

**Commands:**

| Command | Behavior |
|---------|----------|
| `help` | List all commands with descriptions |
| `about` | Open About window |
| `resume` | Open Resume window |
| `projects` | Open Projects window |
| `skills` | Open Skills window |
| `contact` | Open Contact window |
| `whoami` | Print `Jordan Cao — Software Engineer` |
| `ls` | List available sections like a filesystem |
| `clear` | Clear terminal output |
| `github` | Print `https://github.com/JordanCa0` |
| `linkedin` | Print `https://www.linkedin.com/in/jordan-cao` |
| `<unknown>` | `command not found: <input>. Type 'help' for available commands.` |

---

## App Content (Placeholder)

Write realistic-sounding placeholder content for a software engineer portfolio — no lorem ipsum.

| App | Content |
|-----|---------|
| **About** | Name, role, 2–3 sentence bio, profile avatar (CSS circle with initials `JC`) |
| **Resume** | Sections: Experience, Education, Certifications — 1–2 placeholder entries each |
| **Projects** | Grid of 3 placeholder project cards: title, description, tech stack tags, GitHub link |
| **Skills** | Categorized pills: Languages, Frameworks, Tools, Cloud |
| **Contact** | `jordancao77@gmail.com` as a copyable field, GitHub + LinkedIn links. No form submission. |
| **Help** | Formatted list of all terminal commands and descriptions |

---

## Responsive Behavior

- **≥ 768px:** Full OS desktop experience
- **< 768px:** Disable draggable windows. Show a simplified stacked mobile layout instead with standard scroll navigation.

---

## Personal Info

| Field | Value |
|-------|-------|
| Name | Jordan Cao |
| Terminal prompt | `jordan@portfolio:~$` |
| Email | jordancao77@gmail.com |
| GitHub | https://github.com/JordanCa0 |
| LinkedIn | https://www.linkedin.com/in/jordan-cao |

---

## Deployment (Deferred)

Implement after the site itself is complete.

- **Primary:** AWS S3 (static hosting) + CloudFront (CDN)
- **Mirror:** GitHub Pages
- **Domain:** Default URLs for now — no custom domain yet

---

## Implementation Checklist

- [ ] Scaffold Vite + React + TypeScript project
- [ ] Configure Tailwind with custom palette
- [ ] Install dependencies: framer-motion, react-rnd, lucide-react
- [ ] Build TopBar with live clock, fake stats, theme toggle, social links
- [ ] Build Desktop canvas with wallpaper
- [ ] Build AppLauncher sidebar
- [ ] Build Window component (react-rnd, title bar, animations)
- [ ] Implement useWindowManager hook
- [ ] Implement window snapping with preview overlay
- [ ] Build Terminal with all commands
- [ ] Build all 6 app components with placeholder content
- [ ] Wire App.tsx together
- [ ] Implement light/dark mode toggle
- [ ] Implement mobile responsive fallback layout
- [ ] Write README.md
- [ ] Confirm `npm run dev` builds with no TypeScript or Vite errors
- [ ] Initialize git, create GitHub repo, push initial commit
