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

This must pass before a change is merged into `main`.
