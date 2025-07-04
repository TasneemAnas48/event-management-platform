# Event Management Platform

A Next.js-based event management platform that allows users to browse and manage events.

🔗 [Live Demo](https://event-management-platform-umber.vercel.app/)

## Author

[Tasneem Anas](https://www.linkedin.com/in/tasneem-anas/)

## Architectural Decisions

### 1. Route Groups

- Used Next.js route groups `(auth)`, `(dashboard)`, and `(website)` for better organization
- Separates concerns and allows for different layouts per section
- Improves code maintainability and scalability

### 2. State Management

- Redux for global state (auth, events, bookmarks, register)
- React Query for caching (fetching events for website)
- Local storage for persistent data (bookmarks, registrations)

### 3. Component Architecture

- Feature-based component organization
- Reusable UI components (RComponents)
- Dynamic imports for code splitting

### 4. Security

- AuthGuard and GuestGuard for route protection
- Centralized authentication logic
- Prevents unauthorized access

### 5. Database

- Use mock data for database

## Scaling Considerations


### 1. Performance
- Use CDN for static assets and images
- Implement infinite scroll for large datasets

### 2. Database Integration
- Migrate from mock data to a real database by integrating with an API


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
