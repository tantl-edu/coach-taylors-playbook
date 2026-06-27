# Release Workflow

Use this flow for every app update.

## 1. Check Status

```bash
cd "/Users/Staff/Library/CloudStorage/OneDrive-SanDiegoUnifiedSchoolDistrict/Documents/Codex/2026-06-25/this-zip-contains-the-current-working"
git status
```

## 2. Validate Locally

```bash
npm test
```

This checks:

- required app files exist
- JavaScript syntax
- PWA manifest validity
- required icon/image references
- service worker cache references
- important `index.html` references

## 3. Commit

```bash
git add .
git commit -m "Describe the change"
```

Use short, specific messages, for example:

```bash
git commit -m "Default coach mode to draw"
git commit -m "Tighten mobile library controls"
git commit -m "Fix player view toolbar spacing"
```

## 4. Push

```bash
git push
```

GitHub Actions will run `Test and Publish`.

## 5. Confirm GitHub Actions

Open:

```text
https://github.com/tantl-edu/coach-taylors-playbook/actions
```

Confirm:

- `test` is green
- `deploy` is green

## 6. Check Published App

Open:

```text
https://tantl-edu.github.io/coach-taylors-playbook/
```

If the old app appears, refresh once. The service worker may need one page load to pick up the new cache.

## Notes

- Do not use manual GitHub file upload for normal releases.
- Do not commit `outputs/`, extracted ZIP folders, `.DS_Store`, or temporary test files.
- If GitHub asks for a password during `git push`, paste the GitHub personal access token, not the Google account password.

