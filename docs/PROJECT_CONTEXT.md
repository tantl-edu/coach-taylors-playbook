# Project Context

## Name

Coach Taylor's Playbook

## Goal

Build and maintain a basketball coaching PWA for Latin School of Chicago that can eventually support an iPhone/iPad app path. The current product should remain a fast, usable coaching board with play animation, drawing, player-safe sharing, QR links, and GitHub Pages publishing.

## Audience

- Coach Taylor and coaches using the app during practice, games, or planning.
- Youth players, including players under 13, viewing shared plays without accounts or sign-in.

## Product Priorities

1. Keep the basketball court central.
2. Reduce interface clutter.
3. Make iPad/iPhone usage feel intentional, not like a squeezed desktop page.
4. Preserve the existing court, branding, animations, and play library.
5. Keep player sharing privacy-safe.
6. Move toward a cleaner modular codebase over time.

## Privacy Requirements

Players should not need:

- accounts
- email addresses
- passwords
- sign-in
- personal information

Player-facing links should remain read-only and allow only:

- watching animations
- stepping through plays
- changing speed
- reading coach notes

## Deployment

The app is deployed through GitHub Actions to GitHub Pages:

- Repo: `https://github.com/tantl-edu/coach-taylors-playbook`
- Live app: `https://tantl-edu.github.io/coach-taylors-playbook/`
- Workflow: `.github/workflows/pages.yml`

Manual upload should no longer be used.

## Near-Term Roadmap

1. Finish coach-mode simplification:
   - Draw as default mode.
   - Library controls only when loading plays.
   - View controls after a play is selected.
   - Share controls only in Share mode.
2. Modularize the codebase:
   - play data/schema
   - renderer
   - animation engine
   - UI state/modes
   - sharing/QR/player view
   - persistence
3. Add stronger browser smoke tests.
4. Continue refining mobile and tablet ergonomics.
5. Evaluate the path from PWA to native wrapper if needed.

