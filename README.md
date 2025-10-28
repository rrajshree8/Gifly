# Frontend (Vite + React + Tailwind)

Modern React app powered by Vite, Tailwind CSS, and Radix UI.

## Prerequisites

- Node.js 18+ (LTS recommended)
- Yarn 1.x (this repo uses `yarn.lock`)

## Install

```bash
yarn install
```

## Develop

```bash
yarn dev
```

- App runs at `http://localhost:3000` (configured in `vite.config.js`).
- Hot Module Replacement is enabled.

## Build

```bash
yarn build
```

- Production output goes to the `build/` directory (see `vite.config.js -> build.outDir`).

## Preview (serve the production build locally)

```bash
yarn preview
```

- Serves the built assets for local verification (default Vite preview port is 4173).

## Tailwind CSS

- Configured via `tailwind.config.js` and `postcss.config.js`.
- Utility classes are available throughout the app; global styles live in `src` and `public` as usual.

## Aliases

- `@` resolves to `./src` (see `vite.config.js -> resolve.alias`).

## Deployment

- Run `yarn build` and deploy the `build/` directory to your hosting provider.
- A `vercel.json` is included if deploying to Vercel.

## Troubleshooting

- Port busy: change `server.port` in `vite.config.js`.
- HMR issues in restricted networks: remove or adjust the custom `server.hmr` settings in `vite.config.js`.
