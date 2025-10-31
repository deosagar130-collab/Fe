# Hero Aurora Frontend (Vite + React)

A modern React frontend scaffolded with Vite, styled with Tailwind CSS, and enhanced with animated visuals using Three.js (via React Three Fiber) and Framer Motion. Includes a simple CTA that demonstrates calling a backend endpoint with Axios and a complete test setup powered by Vitest and Testing Library.

This repo was prepared during Hacktoberfest 2025.

## Features

- Vite 5 + React 18 with the fast SWC React plugin
- Tailwind CSS with PostCSS and sensible base styles in `src/index.css`
- Animated hero section (`AuroraHero`) using Framer Motion and a starfield rendered with React Three Fiber and `@react-three/drei`
- Axios example: POST request to a local API endpoint for demonstration
- Vitest + Testing Library with jsdom environment and coverage
- ESLint and Prettier for quality and formatting

## Tech stack

- Build tool: Vite 5
- UI: React 18
- Styling: Tailwind CSS + PostCSS + Autoprefixer
- 3D/Effects: `three`, `@react-three/fiber`, `@react-three/drei`
- Animation: `framer-motion`
- HTTP: `axios`
- Testing: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`

## Quick start

Prerequisites:
- Node.js 18 or newer (required by Vite 5)
- npm (bundled with Node)

Install dependencies:

```powershell
npm install
```

Start the dev server (defaults to http://localhost:5173):

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## Scripts

All scripts are defined in `package.json`:

- `dev`: start Vite dev server
- `build`: production build
- `preview`: preview the production build
- `test`: run Vitest in watch/interactive mode
- `test:run`: run tests once (CI style)
- `test:coverage`: run tests with coverage reports (text/json/html)
- `lint`: run ESLint
- `lint:fix`: ESLint with auto-fixes
- `format`: Prettier write
- `format:check`: Prettier check

## Testing

Vitest is configured in `vite.config.js` under the `test` key:

- Environment: `jsdom`
- Globals enabled
- Setup file: `src/test/setup.js` (enables `@testing-library/jest-dom`)
- Coverage provider: V8 (`@vitest/coverage-v8`)

Run tests:

```powershell
npm test
```

One-off/CI run:

```powershell
npm run test:run
```

With coverage:

```powershell
npm run test:coverage
```

Example tests live in `src/test/`, including component tests for the hero and app. Heavy dependencies like R3F/Drei/Framer Motion/axios are mocked in tests for reliability.

## Project structure

```
.
├─ index.html
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css
│  ├─ components/
│  │  ├─ Hero.jsx        # AuroraHero visual + CTA
│  │  ├─ Child.jsx       # example component
│  │  └─ Todo.jsx        # example component
│  └─ test/
│     ├─ setup.js        # jest-dom setup for Vitest
│     ├─ App.test.jsx
│     ├─ App.test1.jsx
│     └─ Hero.test.jsx
└─ prisma/
	└─ schema.prisma      # present but not used by the frontend build
```

## Tailwind CSS

Tailwind is configured in `tailwind.config.js` with content globs for `index.html` and `src/**/*.{js,ts,jsx,tsx}`. The main stylesheet `src/index.css` includes Tailwind layers plus small base/component/utility additions.

If classes aren’t applying, ensure files are matched by the `content` globs and the dev server is running.

## Backend/API note

The CTA button in `AuroraHero` triggers:

```js
axios.post('http://localhost:3000/api/users/login')
```

This is illustrative. If you don’t have a backend listening at that URL, you’ll see a network error in the browser console when clicking the button. The UI itself will still load and function.

## Troubleshooting

- Make sure you’re on Node 18+ (Vite 5 requires it).
- If the dev server port 5173 is busy, Vite will prompt to use another port.
- If Tailwind styles don’t appear, double-check the `content` globs and that `index.css` is imported in `src/main.jsx`.
- If tests fail due to Three.js/webgl errors, ensure mocks are in place (see `src/test/Hero.test.jsx`).

## Contributing

1. Fork the repo and create a feature branch.
2. Install dependencies with `npm install`.
3. Run `npm run dev` while developing.
4. Add or update tests in `src/test/`.
5. Run `npm run lint` and `npm run test:run` before opening a PR.

Please see `CODE_OF_CONDUCT.md` for community guidelines.

## License

This project is licensed under the terms of the license in `LICENSE.md`.

