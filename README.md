# React + TypeScript Template

A starter template for building React applications with TypeScript and Vite. It includes reusable components and utilities, ESLint and Prettier, Husky with Commitlint, and example company styles and assets.

## Getting started

1. Select **Use this template** on GitHub to create a repository for your project.
2. Clone your new repository and install its dependencies:

   ```bash
   git clone https://github.com/<your-account>/<your-repository>.git
   cd <your-repository>
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Vite prints the local development URL in the terminal (usually <http://localhost:5173/>).

## Available commands

| Command           | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with hot module replacement.   |
| `npm run build`   | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally. Run `npm run build` first.   |
| `npm run lint`    | Check the project with ESLint.                                   |
| `npm run format`  | Format the files in `src/` with Prettier.                        |

## Project layout

```text
.
├── public/                 Static assets served from the site root
├── src/
│   ├── components/         Reusable, self-contained component directories
│   ├── libs/               Shared data and utility functions
│   │   ├── data.ts         Data-related operations, such as API calls
│   │   └── utils/          Date, money, name, number, and file-size helpers
│   ├── pages/              Page-level components
│   ├── styles/             Shared and company-specific stylesheets
│   ├── App.tsx             Application routes
│   ├── index.css           Global stylesheet imports
│   └── main.tsx            Application entry point and router setup
├── index.html              Vite HTML entry point
├── vite.config.ts          Vite configuration
└── package.json            Scripts and dependencies
```

## Components

Each component lives in its own directory under `src/components/`. Keep its implementation, styles, and any component-specific files together there. Give each component directory an `index.ts` that exports its public API, then re-export components from `src/components/index.ts`. This lets the rest of the application import from the shared components entry point instead of reaching into a component's internal files.

For example, the loading component is organized as:

```text
src/components/loading/
├── component.tsx
├── index.ts
└── loading.css
```

Shared helpers live in `src/libs/utils/` and are re-exported through its `index.ts`.

## Styling and assets

Global styles are imported by `src/index.css`. Shared defaults are in `src/styles/general.css`, with the example company styles in `src/styles/HH.css` and `src/styles/BWL.css`. Put static files that should be served as-is in `public/`.

## Included tooling

- React, TypeScript, and Vite
- ESLint and Prettier
- Husky and Commitlint
- Microsoft Power Apps integration
- Example components, formatting utilities, styles, and image assets
