# Ikhwan Inzaghi — AI portfolio

An Expo Router portfolio with four technical case studies, a filterable project archive, research and publication details, experience, and biography.

## Develop and verify

```sh
npm ci
npm run web
npm run lint
npx tsc --noEmit
npx expo export -p web
```

Expo exports the site to `dist/`. Serve that directory on a static host that resolves extensionless routes to HTML files.

## Edit content

The four published project routes are generated from `src/content/projects.ts`. Each entry defines its slug, filter categories, workflow, and case-study sections. The profile and publication are in `src/content/profile.ts`. Work history and education are in `src/content/experience.ts` and `src/content/education.ts`.
