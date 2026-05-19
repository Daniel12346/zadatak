# AGENTS.md — Admin Dashboard

## Stack

| Concern | Choice |
|---------|--------|
| Framework | Vite + React (TypeScript) |
| CSS | Plain CSS / Sass (`.module.scss`) |
| State | Zustand |
| Routing | react-router-dom v7 |
| Package mgr | npm |
| Tests | None yet |

## Project requirements (do not deviate)

### Auth flow
- Login page simulates network request (`Promise` resolves after 1s → 200 OK)
- On success: store token/user in Zustand store **and** `localStorage`
- Route guards: unauthenticated users must **not** access dashboard; authenticated users must **not** see login page
- Persist auth state on refresh (read from `localStorage` into Zustand on init)

### Layout
- Sidebar (navigation) + Navbar + Content area
- Fully responsive (mobile + desktop)
- Sidebar is the primary navigation between pages

### Pages (2–3)
1. **User Management** — table with CRUD (add, edit, delete) from local Zustand state
2. **Dashboard** — statistics / overview
3. (Optional third page, e.g. Settings)

### Error handling
- At least one page must intentionally simulate an error (API crash, parse failure)
- Catch with React Error Boundary + user-friendly fallback UI

## Commands (after scaffolding)

```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # ESLint
```

## Architecture conventions

```
src/
├── components/      # shared UI (Layout, Sidebar, Navbar, ErrorBoundary)
├── pages/           # route-level page components
├── stores/          # Zustand stores (auth, users, dashboard)
├── hooks/           # custom hooks (useAuth, useUsers, etc.)
├── utils/           # helpers, constants
├── styles/          # global styles, variables, mixins
├── types/           # TypeScript types/interfaces
├── App.tsx          # router setup + providers
└── main.tsx         # entry point
```

- Use CSS Modules (`*.module.scss`) for component-scoped styles
- Global variables (colors, spacing, breakpoints) in a single `_variables.scss` partial
- Zustand stores per domain: `authStore`, `usersStore`, etc.
- All dummy/mock data lives in `src/utils/mockData.ts` or `src/utils/mockApi.ts`

## Route guard convention

Wrap `<Outlet />` in a `ProtectedRoute` component that redirects to `/login` if no auth token. Use a `PublicRoute` wrapper for the login page (redirects to `/dashboard` if already authed).

## Error Boundary

Place it at the layout level so a crash in one page doesn't break the whole app. Log the error, show a friendly message + retry button.
