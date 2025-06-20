# React Tracks Challenge – Developer Notes

## Project Structure & Philosophy

This project is organized to keep things simple, scalable, and easy to reason about:

- **`src/pages/`**: Each file here is a top-level route/page. Pages are responsible for data fetching, state, and composing the UI. For example, `TrackListPage.tsx` handles the main list/search/filter view, and `TrackDetailsPage.tsx` is for the details route.
- **`src/components/`**: All reusable UI pieces live here. Components are stateless and get their data/handlers via props. This makes them easy to test and reuse. Examples: `TrackTable`, `TrackCard`, `Filters`, `SearchBar`.
- **Component SCSS**: Every component has its own `.scss` file (e.g., `TrackTable.scss`). This keeps styles local, so you never have to worry about one component's styles breaking another's.
- **`src/styles/`**: Only global styles and Tailwind setup go here. All component-specific styles stay with their component.

This setup means you can drop in a new feature or refactor a component without worrying about breaking unrelated parts of the app.

## How It Works

- **UI**: Built with React, Vite, TypeScript, and shadcn/ui for accessible, modern UI components. Tailwind is used for utility classes and layout.
- **Responsiveness**: On desktop/tablet, you get a table/grid view. On mobile, it switches to a card view. This is handled by a custom `useIsMobile` hook.
- **Accessibility**: All interactive elements are keyboard-accessible and have ARIA labels. Dialogs have proper titles and descriptions for screen readers.
- **Infinite Scroll**: The list loads in pages. When you hit "Load More," it fetches the next chunk. This keeps things fast, even with a huge dataset.
- **Debounced Search**: The search input uses a debounce hook, so we only hit the API after the user stops typing for a bit. This keeps the UI snappy and avoids spamming the backend.
- **Loader Placement**: The loader only shows in the list area, so the search/filter controls are always visible.
- **State Management**: All state is managed with React hooks.

## Why This Structure?

- **Scalability**: Easy to add new features or refactor without breaking things.
- **Maintainability**: New devs can jump in and quickly find what they need.

## Running the Project

1. Start the backend API (see the root README).
2. In the `view` folder:
   ```sh
   npm install
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) (or whatever port Vite gives you).

---
