# TambolaLive — Screen & UI Documentation

## Overview

`TambolaLive` is a fully responsive React component that displays a live Tambola (Housie) draw board. It connects to a WebSocket server to receive real-time number calls and renders animations, a number grid, tray, stats, and progress — all in a Navy & Gold themed UI.

---

## Component: `TambolaLive`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gameId` | `number` | `34` | The game ID sent to the socket server to filter events and request game data |

---

## Layout Breakpoints

The component uses a `ResizeObserver` on its container to determine layout — not `window.innerWidth` — making it safe inside sidebars, modals, or split views.

| Name | Width Condition | Layout |
|------|----------------|--------|
| Mobile | `< 520px` | Vertical stack: header + stats → big ball + tray → progress → grid |
| Tablet | `520px – 819px` | Two columns: left panel (ball, tray, stats) + right panel (grid) |
| Desktop | `≥ 820px` | Two columns: wider left panel (ball, tray, stats, legend) + right panel (grid) |

### Size Variables (auto-scaled by breakpoint)

| Variable | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| `BIG` (big ball diameter) | `92px` | `116px` | `148px` |
| `TRAY` (tray ball diameter) | `46px` | `54px` | `64px` |
| `TSLOT` (tray slot diameter) | `54px` | `62px` | `76px` |
| `GRID` (grid ball diameter) | `26px` | `36px` | `44px` |
| `LPANW` (left panel width) | — | `210px` | `340px` |

---

## Visual Sections

### 1. Status Indicator (top-right)

Displays connection and game state. Always positioned absolutely at `top: 14, right: 14`.

| State | Dot Color | Label |
|-------|-----------|-------|
| Disconnected | `#ff4444` | `OFFLINE` |
| Connected, not started | `#FBEFA4` | `WAITING` / `PAUSED` |
| Connected, live | `#1abc9c` | `STARTED` (pulsing) |

---

### 2. Big Ball Display

The large animated ball shown when a number is called.

- **Reveal animation**: `tlBallReveal` — scales from 0.15 → 1 with a spin, using `cubic-bezier(0.22,1,0.36,1)`.
- **Float animation**: `tlFloatDrift` — gentle Y-axis oscillation while the ball is displayed.
- **Pulse rings**: 3 concentric rings expand outward (`tlSoftPulse`) in the ball's decade color.
- **Particles**: 12 particles burst outward after a 150ms delay (`tlParticle`).
- **Ground glow**: A radial ellipse shadow under the ball, sized to ball diameter × 0.82.
- Ball **disappears** after `4000ms` (pulse + particles cleared at the same time).

#### Ball Colors — Decade Palette

Each range of 10 numbers has a distinct color scheme:

| Numbers | Base Color | Light Color |
|---------|-----------|------------|
| 1–10 | `#004296` (deep blue) | `#1a6fd8` |
| 11–20 | `#005f8a` (teal-blue) | `#0090cc` |
| 21–30 | `#1a5276` (steel blue) | `#2e86c1` |
| 31–40 | `#1a7a6a` (teal) | `#1abc9c` |
| 41–50 | `#b8860b` (dark gold) | `#FBEFA4` |
| 51–60 | `#c9a227` (gold) | `#ffe066` |
| 61–70 | `#a07620` (amber) | `#d4a017` |
| 71–80 | `#7d5a0b` (bronze) | `#b8860b` |
| 81–90 | `#3a3a8c` (indigo) | `#6666cc` |

---

### 3. Tray (Latest / Previous)

Two circular slots showing the last two called numbers.

- **Slot 0** — "LATEST": plays `tlTraySettle` bounce animation on every new number.
- **Slot 1** — "PREV": shows the number previously in slot 0, no new animation.
- Animation is triggered via a stable `id` counter per slot, used as the React `key` — not the number itself. This ensures the animation fires even if the same number were somehow repeated.
- Empty slots show a faint dashed circle placeholder.

---

### 4. Board Grid

A `10 × 9` grid of balls for numbers 1–90.

| Ball State | Appearance |
|-----------|-----------|
| **Uncalled** | Dark navy fill, 42% opacity, small scale |
| **Called** | Decade-colored gradient, full opacity, `scale(1.04)` |
| **Arriving** (just called) | `tlGridArrive` animation — burst from scale 0.2, brightness flash |

Transitions: `background`, `box-shadow`, `transform`, and `opacity` are CSS-transitioned for smooth reveals on called balls.

---

### 5. Stats Bar

Two pill cards side by side:

| Card | Value | Color |
|------|-------|-------|
| CALLED | Numbers called so far | `#FBEFA4` (gold) |
| LEFT | 90 − called | `#1abc9c` (teal) |

---

### 6. Progress Bar

A slim 3px bar spanning 0–90 with a gradient fill (`#004296 → #b8860b → #FBEFA4`). Animates width on each number call with `0.8s cubic-bezier` easing. Shows percentage label centered above.

---

### 7. Legend (Desktop only)

Color swatches for each decade range (1–10 through 81–90) with matching dot and label.

---

### 8. Done Overlay

Shown when `game_over` socket event fires. Covers the entire component with a semi-transparent backdrop (`rgba(0,8,25,0.92)`), two rotating decorative rings, and a glowing "FULL HOUSE" text. A **PLAY AGAIN** button calls `window.location.reload()`.

---

## Animations Reference

| Name | Used On | Description |
|------|---------|-------------|
| `tlBallReveal` | Big ball | Spin + scale from 0 → 1 on number call |
| `tlTraySettle` | Tray slot 0 | Bounce-in when new number enters tray |
| `tlGridArrive` | Grid ball | Scale burst + brightness flash on arrival |
| `tlSoftPulse` | Pulse rings | Rings expand and fade outward |
| `tlFloatDrift` | Big ball wrapper | Gentle floating oscillation |
| `tlShimmer` | TAMBOLA title | Gold shimmer sweep across text |
| `tlRotateSlow` | Decorative rings | Slow continuous rotation |
| `tlBreathe` | Status dot | Opacity pulse for live indicator |
| `tlDoneFade` | Done overlay | Fade + scale-in on game over |
| `tlDoneGlow` | "FULL HOUSE" text | Pulsing text glow |
| `tlParticle` | Particle burst | Particles fly outward using `--px`/`--py` CSS vars |

---

## Sub-components

| Component | Description |
|-----------|-------------|
| `BigBall` | Large number ball with shimmer highlights. Keyed by `revealId` for clean re-mount animation. |
| `TrayBall` | Smaller ball for tray slots. Keyed by `slot.id` for animation correctness. |
| `GridBall` | Grid cell ball. Uses CSS transitions for called state, `tlGridArrive` for arriving state. |
| `Particles` | Renders 12 particle divs positioned absolutely over the big ball. |
| `BigBallSection` | Composes pulse rings + particles + ground glow + float wrapper around `BigBall`. |
| `TraySlots` | Renders two tray slots (horizontal or vertical). |
| `StatsBar` | Called / Left stat pills. |
| `ProgressBar` | Animated progress strip. |
| `Legend` | Decade color swatches (desktop only). |
| `StatusDot` | Live connection + game status indicator. |
| `BoardGrid` | 10×9 grid of `GridBall` components. |

---

## Fonts

Loaded via Google Fonts:

- **Cinzel** (weights 700, 900) — Used for all numbers, labels, headings.
- **Raleway** (weights 300, 400, 600) — Used for secondary UI text and body.

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Deep Navy | `#001433` | Background base |
| Mid Navy | `#002b66` | Background gradient |
| Bright Navy | `#004296` | Accent, ball color (1–10) |
| Gold | `#FBEFA4` | Primary highlight, title shimmer |
| Teal | `#1abc9c` | "Left" stat, live dot |
| Red | `#ff4444` | Offline/disconnected dot |
