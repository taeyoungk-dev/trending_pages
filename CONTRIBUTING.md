# Contribution guide

## Development flow

1. Create a focused branch for the change.
2. Run `npm ci` when dependencies need to be restored.
3. Make one logically scoped change at a time.
4. Run `npm run check` before committing.
5. Explain both the implementation and its user impact in the pull request.

## Commit messages

Use a short imperative English sentence that describes the completed change.

```text
Build unified engineering portfolio
Separate verification from manual deployment
Expand portfolio documentation
Improve keyboard focus behavior
```

Do not add conventional-commit prefixes such as `feat:`, `fix:`, or `ci:`. Keep the subject under approximately 72 characters and add a body only when the reason or trade-off is not clear from the diff.

## Quality gate

```bash
npm run check
```

This runs Vitest, the TypeScript project build (`tsc -b`) and the Vite production build. It must pass before a change is merged into `main`; `.github/workflows/ci.yml` runs the same command on every push and pull request.

Use `npm run typecheck` for a quick type-only check while developing.

## Expectations for UI changes

- Keep interactions keyboard operable and announce state with semantic attributes (`aria-pressed`, `aria-expanded`, `aria-live`).
- Respect `prefers-reduced-motion` for animation, scrolling and pointer-driven motion.
- Check layouts at 360px, 768px and 1280px with no clipped or horizontally overflowing content.
- Put non-trivial calculations in `src/lib/` as pure functions with unit tests.

## Deployment

Pushing to `main` only runs verification. GitHub Pages deployment is manual: run **Actions → Deploy portfolio** after enabling Pages with the `GitHub Actions` source.
