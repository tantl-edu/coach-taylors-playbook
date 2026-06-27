Coach Taylor's Playbook - V30 Complete Plays + Stable Filters

Player View privacy notes:
- Players do not need accounts, email addresses, or sign in.
- Shared player links are read-only and expose only play viewing controls.
- Player View allows animation playback, step navigation, speed changes, and coach notes.
- Player View blocks editing, drawing, saving, and custom play management.
- Shareable URLs can point to one play, a practice playlist, or the team library.
- URL examples: ?v=player&p=2, ?v=player&list=2.3.4, ?v=player&library=team.
- If testing from a local file, paste the hosted app URL in Share > Public app URL before generating QR codes for players.

This version keeps the stable v24-style UI and adds:
- More complete preloaded plays with 5-7 steps where appropriate.
- Final step now intentionally places the ball with the likely shot/finish player.
- Filter dropdown restored without shifting the overall UI.
- Filters include: All Plays, All Offense, All Defense, Half Court, BLOB, SLOB, Fast Break, Press Break, Zone Defense, Man Defense, Blank.
- Basketball favicon retained.
- Builder preview, edit saved plays, curved builder paths, drawing tools, and iPad-friendly layout remain.

GitHub Pages upload:
Use only these files in your repository root:
- index.html
- app.js
- app-config.js
- app-data.js
- pwa.js
- sw.js
- styles.css
- manifest.webmanifest
- latin-logo.png
- court-background.png
- favicon.png
- icon-192.png
- icon-512.png
- apple-touch-icon.png
- README.txt

PWA notes:
- GitHub Pages HTTPS is enough for install/offline testing.
- The service worker caches the app shell and falls back to index.html for shared player links.
- After uploading a new version, refresh once on each device so the service worker can update its cache.
