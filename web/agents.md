# Web/Frontend Agents — UADE Mentor

This document lists agent roles and responsibilities for the `web` React + Vite project.

- **Explore**: Reads the repository to find frontend entry points, routes, and assets.
- **Build**: Runs the Vite build (`npm run build`) and reports build output artifacts.
- **Dev**: Starts the dev server (`npm run dev`) and monitors HMR behavior.
- **Test**: Runs frontend tests (unit/e2e) when configured; reports failures and stack traces.
- **Lint**: Runs linters and formatters (ESLint, Prettier) and suggests fixes.
- **Deploy**: Packages the `dist/` folder and uploads to the chosen hosting (Netlify, Vercel, or static server).

Usage notes

- To run locally: `npm install` then `npm run dev`.
- CI pipelines should execute `npm run build` and then run `npm run preview` to smoke-test the artifact.
