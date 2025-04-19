# Event Management Platform

A Next.js-based event management platform that allows users to browse, register for, and manage events.

## Rendering Strategies

### Client-Side Rendering (CSR)

- `/login` - Uses CSR for dynamic form handling and real-time validation

### Server-Side Rendering (SSR)

- `/` (Homepage) - Uses SSR for initial event listing and SEO optimization
- `/event/[id]` - Uses SSR for event details to improve SEO and initial load performance

### Hybrid Approach

- `/my-events` - Combines SSR for initial data fetch with CSR for dynamic updates
- `/admin` - Uses SSR for initial data load with CSR for real-time updates

## Architectural Decisions

### 1. Route Groups

- Used Next.js route groups `(auth)`, `(dashboard)`, and `(website)` for better organization
- Separates concerns and allows for different layouts per section
- Improves code maintainability and scalability

### 2. State Management

- Redux for global state (auth, events, bookmarks, register)
- React Query for server state management (events for website)
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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
