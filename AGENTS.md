# Coach Taylor's Playbook - Codex Project Notes

## Project Purpose

Coach Taylor's Playbook is a Latin School of Chicago basketball coaching PWA. The app should work well on desktop, iPad, and iPhone, with the basketball court kept as the primary visual focus.

## Source of Truth

- Local project path: `/Users/Staff/Library/CloudStorage/OneDrive-SanDiegoUnifiedSchoolDistrict/Documents/Codex/2026-06-25/this-zip-contains-the-current-working`
- GitHub repo: `https://github.com/tantl-edu/coach-taylors-playbook`
- Published app: `https://tantl-edu.github.io/coach-taylors-playbook/`
- Main branch: `main`

Do not return to manual GitHub file uploads. The intended workflow is local edits, commit, push, GitHub Actions, then published site.

## Development Rules

- Preserve the Latin School branding and existing hardwood court appearance.
- Keep the court as the primary focus; reduce overlays and unnecessary controls.
- Maintain the player privacy model: no player accounts, emails, sign-in, or personal information.
- Preserve existing play library compatibility whenever possible.
- Keep changes small, reviewable, and committed with clear messages.
- Do not commit generated `outputs/`, `.DS_Store`, or temporary files.
- Run validation before committing:

```bash
npm test
```

## Current Architecture

- `index.html`: static app shell and UI markup.
- `styles.css`: full responsive UI styling, overlays, coach modes, mobile/iPad behavior.
- `app.js`: main play engine, drawing, animation, sharing, library, and UI mode logic.
- `app-data.js`: bundled play library.
- `app-config.js`: play/action constants.
- `pwa.js`: service worker registration.
- `sw.js`: service worker cache and offline/navigation behavior.
- `manifest.webmanifest`: PWA metadata and icons.
- `.github/workflows/pages.yml`: validates and publishes the app to GitHub Pages.
- `scripts/validate-static-app.mjs`: local/GitHub validation for the static PWA.

## Preferred Work Loop

1. Check current repo state.
2. Make one focused change.
3. Run `npm test`.
4. Commit.
5. Push.
6. Confirm GitHub Actions passes.
7. Check the published app.

## UI Direction

The app is moving toward a modern iPad coaching board:

- Coach controls should stay visible and predictable.
- Mode-specific tools should appear only when relevant.
- Draw mode is the natural default for quick in-gym use.
- Library mode is where a coach selects plays.
- View/playback mode should be entered after a play is selected.
- Player View remains read-only and privacy-safe.

