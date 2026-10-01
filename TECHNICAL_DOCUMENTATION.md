# Pakistani Myth Guider — Technical Documentation

**Version:** 1.0.0
**Last Updated:** March 31, 2026
**Repository:** github.com/farzeenamjad456-png/mynt-dashboard
**Deployment Target:** Vercel

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Ecosystem](#2-tech-stack--ecosystem)
3. [Architecture Overview](#3-architecture-overview)
4. [Frontend Framework & Build System](#4-frontend-framework--build-system)
5. [UI Component Library & Design System](#5-ui-component-library--design-system)
6. [Routing & Navigation](#6-routing--navigation)
7. [State Management](#7-state-management)
8. [Backend — Supabase](#8-backend--supabase)
9. [Authentication System](#9-authentication-system)
10. [Database Schema & Design](#10-database-schema--design)
11. [Row-Level Security (RLS)](#11-row-level-security-rls)
12. [Database Functions (PL/pgSQL)](#12-database-functions-plpgsql)
13. [Service Layer (Data Access)](#13-service-layer-data-access)
14. [React Query Integration (Hooks Layer)](#14-react-query-integration-hooks-layer)
15. [AI Chatbot — Gemini Integration](#15-ai-chatbot--gemini-integration)
16. [Internationalization (i18n)](#16-internationalization-i18n)
17. [Styling, Theming & Animations](#17-styling-theming--animations)
18. [Page-by-Page Breakdown](#18-page-by-page-breakdown)
19. [Component Architecture](#19-component-architecture)
20. [Form Handling & Validation](#20-form-handling--validation)
21. [Type System](#21-type-system)
22. [Environment Variables & Configuration](#22-environment-variables--configuration)
23. [Build, Scripts & Tooling](#23-build-scripts--tooling)
24. [Deployment — Vercel](#24-deployment--vercel)
25. [Directory Structure](#25-directory-structure)
26. [Seed Data](#26-seed-data)
27. [Project Statistics](#27-project-statistics)
28. [Dependency Manifest](#28-dependency-manifest)

---

## 1. Project Overview

**Pakistani Myth Guider** is Pakistan's first multilingual AI-powered fact-checking platform designed to combat misinformation about Pakistani myths, superstitions, cultural beliefs, and folklore. The platform allows users to explore, verify, and discuss myths in three languages: English, Urdu, and Punjabi.

### Purpose & Mission

The platform was developed as a university project at Government College Women University, Sialkot, with the mission to:

- Provide evidence-based fact-checking for common Pakistani myths and superstitions
- Preserve cultural folklore and storytelling traditions in a digital format
- Offer an AI-powered chatbot for real-time myth verification
- Build a community-driven platform where users can submit stories, vote on myths, and engage in discussions
- Support multilingual access to reach wider audiences across Pakistan

### Key Features

| Feature | Description |
|---------|-------------|
| **Myth Database** | Curated collection of Pakistani myths with fact-check verdicts (Verified, Debunked, Partially True) |
| **AI Chatbot** | Real-time myth fact-checking powered by Google Gemini 3 Flash Preview with streaming responses |
| **Storytelling** | Community-submitted cultural stories and folklore |
| **Voting System** | Like/dislike myths and like stories with atomic toggle logic |
| **Comments** | Moderated comment system on myths and stories |
| **Admin Dashboard** | Full CRUD management for myths, stories, comments, and users |
| **Multilingual** | Complete UI translation in English, Urdu (RTL), and Punjabi (RTL) |
| **Categories** | Organized browsing: Health, Cultural, Historical, Social myths |
| **Trending** | Popular myths ranked by views and engagement |

---

## 2. Tech Stack & Ecosystem

### Frontend

| Technology | Version | Role |
|------------|---------|------|
| **React** | 18.3.1 | Core UI framework — component-based architecture with hooks |
| **TypeScript** | 5.8.3 | Static type safety across the entire codebase |
| **Vite** | 5.4.19 | Build tool — fast HMR in dev, optimized production bundles |
| **SWC** | via @vitejs/plugin-react-swc 3.11.0 | Rust-based compiler replacing Babel for 20x faster builds |
| **React Router** | 6.30.1 | Client-side routing with nested routes and route guards |
| **TanStack React Query** | 5.83.0 | Server state management, caching, and mutation handling |

### UI & Styling

| Technology | Version | Role |
|------------|---------|------|
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework with custom design tokens |
| **shadcn/ui** | Latest | 52 accessible, customizable UI components built on Radix UI |
| **Radix UI** | Various v1.x | Headless, accessible component primitives (15+ packages) |
| **Tailwind Animate** | 1.0.7 | Animation utility classes for Tailwind |
| **@tailwindcss/typography** | 0.5.16 | Prose styling for markdown-rendered content |
| **Lucide React** | 0.462.0 | Icon library (500+ icons) |
| **class-variance-authority** | 0.7.1 | Type-safe component variant management |
| **tailwind-merge** | 2.6.0 | Intelligent Tailwind class merging without conflicts |
| **clsx** | 2.1.1 | Conditional className composition |
| **next-themes** | 0.3.0 | Light/dark theme management with system preference detection |

### Backend & Database

| Technology | Version | Role |
|------------|---------|------|
| **Supabase** | 2.100.1 (@supabase/supabase-js) | Backend-as-a-Service: PostgreSQL database, authentication, Row-Level Security, real-time subscriptions, and REST API — all managed via the Supabase platform |
| **PostgreSQL** | 15 (Supabase-managed) | Relational database with JSONB, UUID, and advanced indexing |

### AI Integration

| Technology | Version | Role |
|------------|---------|------|
| **Google Gemini** | @google/genai 1.47.0 | AI-powered myth fact-checking chatbot |
| **Gemini 3 Flash Preview** | Latest | Specific model used — fast inference with streaming support |
| **react-markdown** | 10.1.0 | Renders markdown-formatted AI responses in the chat UI |

### Forms & Validation

| Technology | Version | Role |
|------------|---------|------|
| **React Hook Form** | 7.61.1 | Performant form state management with minimal re-renders |
| **@hookform/resolvers** | 3.10.0 | Bridges Zod schemas to React Hook Form |
| **Zod** | 3.25.76 | TypeScript-first schema validation |

### Notifications & Feedback

| Technology | Version | Role |
|------------|---------|------|
| **Sonner** | 1.7.4 | Toast notification system (primary) |
| **@radix-ui/react-toast** | 1.2.14 | Secondary toast system via shadcn/ui |

### Additional Libraries

| Technology | Version | Role |
|------------|---------|------|
| **date-fns** | 3.6.0 | Lightweight date formatting and manipulation |
| **recharts** | 2.15.4 | Chart library (available for admin dashboard analytics) |
| **embla-carousel-react** | 8.6.0 | Carousel/slider component |
| **vaul** | 0.9.9 | Drawer/bottom sheet component |
| **cmdk** | 1.1.1 | Command palette component |
| **react-day-picker** | 8.10.1 | Date picker component |
| **input-otp** | 1.4.2 | OTP input component |
| **react-resizable-panels** | 2.1.9 | Resizable panel layouts |

### Development Tooling

| Technology | Version | Role |
|------------|---------|------|
| **ESLint** | 9.32.0 | Code linting with flat config (v9) |
| **typescript-eslint** | 8.38.0 | TypeScript-specific linting rules |
| **eslint-plugin-react-hooks** | 5.2.0 | React hooks rules enforcement |
| **eslint-plugin-react-refresh** | 0.4.20 | Fast refresh compatibility checks |
| **PostCSS** | 8.5.6 | CSS processing pipeline |
| **Autoprefixer** | 10.4.21 | Automatic vendor prefix insertion |

---

## 3. Architecture Overview

The application follows a layered architecture pattern:

```
┌────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  React Components (Pages, Sections, UI Components)         │
│  Tailwind CSS + shadcn/ui + Lucide Icons                   │
├────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER                        │
│  React Router (Navigation) │ Contexts (Auth, Language)     │
│  React Query (Cache)       │ React Hook Form (Forms)       │
├────────────────────────────────────────────────────────────┤
│                    HOOKS LAYER                              │
│  useMyths │ useStories │ useComments │ useVotes │ useProfiles│
│  Wraps services with React Query for caching & mutations   │
├────────────────────────────────────────────────────────────┤
│                    SERVICE LAYER                            │
│  myths.ts │ stories.ts │ comments.ts │ votes.ts │ profiles.ts│
│  gemini.ts (AI service)                                     │
│  Pure async functions — no React dependencies               │
├────────────────────────────────────────────────────────────┤
│                    DATA LAYER                                │
│  Supabase Client (REST API) │ Google Gemini SDK             │
│  PostgreSQL + RLS           │ Streaming Chat Sessions       │
└────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User interacts** with a React component (page or section)
2. **Component calls a hook** (e.g., `useMyths()`) which wraps a service function with React Query
3. **Hook calls the service** (e.g., `fetchMyths()`) which constructs a Supabase query
4. **Supabase SDK** sends a REST request to the Supabase PostgreSQL database
5. **PostgreSQL evaluates RLS policies** to filter/authorize the data
6. **Data returns** through the chain: Supabase → Service → Hook (cached by React Query) → Component renders

For the AI chatbot:
1. **User types a message** in the ChatbotPage
2. **Component calls** `sendMessageStreaming()` from the Gemini service
3. **Gemini SDK** streams response chunks from the Gemini 3 Flash Preview model
4. **Each chunk updates** the React state, creating a real-time typing effect
5. **react-markdown** renders the final response with proper formatting

---

## 4. Frontend Framework & Build System

### React 18.3.1

The application uses React 18 with the following patterns:

- **Functional components** exclusively — no class components
- **React Hooks** for all state and side effects: `useState`, `useEffect`, `useRef`, `useCallback`, `useContext`
- **Context API** for global state (authentication, language)
- **Automatic batching** (React 18 feature) — multiple state updates in event handlers and async functions are batched into a single re-render
- **Concurrent features** available but not explicitly used (no Suspense boundaries or `useTransition`)

### Vite 5.4.19

Vite serves as the build tool and development server:

- **Dev Server:** Runs on `localhost:8080` with full HMR (Hot Module Replacement)
- **SWC Compiler:** Uses `@vitejs/plugin-react-swc` instead of Babel — provides ~20x faster compilation
- **Path Aliases:** `@` maps to `./src` for clean imports (e.g., `@/components/Navbar`)
- **Environment Variables:** Uses `VITE_` prefix convention for client-side env vars accessed via `import.meta.env`
- **Production Build:** Generates optimized bundles in `dist/` directory with tree-shaking, code splitting, and minification

**Configuration** (`vite.config.ts`):
```typescript
export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080 },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
```

### TypeScript 5.8.3

- **Strict mode:** Partially enabled (no `noImplicitAny`, no `strictNullChecks`) for faster development
- **Target:** ES2020
- **JSX:** react-jsx (automatic runtime)
- **Module Resolution:** Bundler mode
- **Path Aliases:** Configured in `tsconfig.app.json` to match Vite aliases

---

## 5. UI Component Library & Design System

### shadcn/ui

The project uses **shadcn/ui**, a collection of reusable, accessible components built on top of Radix UI primitives. Unlike traditional component libraries, shadcn/ui components are copied directly into the project (`src/components/ui/`) and can be fully customized.

**52 components available:**

| Category | Components |
|----------|-----------|
| **Layout** | Card, Separator, Tabs, Accordion, Collapsible, Scroll Area, Resizable Panels, Sidebar, Aspect Ratio |
| **Forms** | Input, Textarea, Label, Checkbox, Radio Group, Switch, Select, Slider, Toggle, Toggle Group, Calendar, Input OTP, Form (React Hook Form integration) |
| **Overlays** | Dialog, Alert Dialog, Drawer, Popover, Hover Card, Dropdown Menu, Context Menu, Menubar, Sheet, Tooltip, Command |
| **Feedback** | Toast, Toaster, Sonner, Alert, Badge, Progress, Skeleton |
| **Data** | Table, Pagination |
| **Media** | Avatar, Carousel, Chart |
| **Navigation** | Breadcrumb, Navigation Menu |

### Design System Configuration

**`components.json`** — shadcn/ui configuration:
```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": { "config": "tailwind.config.ts", "css": "src/index.css", "baseColor": "slate" },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Utility Function

**`src/lib/utils.ts`** — Core utility used across all components:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This function merges Tailwind classes intelligently, preventing conflicts (e.g., `cn("px-4", "px-2")` → `"px-2"`).

---

## 6. Routing & Navigation

### React Router v6.30.1

The application uses `BrowserRouter` with declarative route definitions in `src/App.tsx`.

### Route Table

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | `Index` | Public | Landing page with hero, categories, trending, chatbot CTA |
| `/auth` | `AuthPage` | Public | Sign In / Sign Up forms |
| `/admin` | `AdminLogin` | Public | Admin login portal |
| `/admin/dashboard` | `AdminDashboard` | Admin Only | Full admin panel (RequireAuth guarded) |
| `/myth/:id` | `MythDetail` | Public | Individual myth with content, sources, votes, comments |
| `/chatbot` | `ChatbotPage` | Public | Gemini AI fact-checking chatbot |
| `/chatbot/storytelling` | `StorytellingPage` | Public | Interactive storytelling experience |
| `/story/:id` | `StoryDetail` | Public | Individual story with content, likes, comments |
| `/categories` | `CategoriesPage` | Public | All categories overview |
| `/categories/:category` | `CategoriesPage` | Public | Filtered myths by category |
| `/trending` | `TrendingPage` | Public | Popular myths with filters |
| `/about` | `AboutPage` | Public | Mission, values, team, contact |
| `*` | `NotFound` | Public | 404 catch-all |

### Route Protection

The `RequireAuth` component (exported from `AuthContext`) wraps protected routes:
```tsx
<Route path="/admin/dashboard" element={
  <RequireAuth requireRole="admin" fallbackPath="/admin">
    <AdminDashboard />
  </RequireAuth>
} />
```

It checks:
1. Is the user authenticated? If not, redirect to fallback path
2. Does the user have the required role? If not, redirect

### Navigation Components

- **Navbar** — Fixed top navigation with desktop links, mobile hamburger menu, language switcher, and UserMenu
- **ScrollToTop** — Scrolls to top on every route change
- **Footer** — Multi-column footer with category links, quick links, and contact info

---

## 7. State Management

The application uses a multi-layered state management approach:

### 1. React Query (Server State)

**TanStack React Query v5.83.0** manages all server-side data:

- **Automatic caching** — Data is cached by query keys (e.g., `['myths', { category: 'Health' }]`)
- **Background refetching** — Stale data is refreshed automatically
- **Optimistic mutations** — Cache invalidation triggers refetch after create/update/delete operations
- **Query key structure:**
  - `['myths', filters]` — Myth list
  - `['myth', id]` — Single myth
  - `['mythCategoryCounts']` — Category statistics
  - `['stories', filters]` — Story list
  - `['story', id]` — Single story
  - `['comments', filters]` — Comments
  - `['allComments']` — All comments (admin)
  - `['userMythVote', mythId, userId]` — User's vote on a myth
  - `['userStoryVote', storyId, userId]` — User's vote on a story

### 2. React Context (Global UI State)

Two contexts provide global application state:

- **AuthContext** — User session, profile, roles, auth methods
- **LanguageContext** — Current language, translation function, RTL/LTR direction

### 3. Component State (Local UI State)

Standard `useState` and `useRef` for component-specific state:
- Form inputs, modals, dropdowns, search filters
- Chatbot messages and streaming state
- Admin dashboard tab selection

---

## 8. Backend — Supabase

### What is Supabase?

Supabase is an open-source Backend-as-a-Service (BaaS) that provides:

- **PostgreSQL Database** — Full-featured relational database
- **Authentication** — Email/password, OAuth, magic links
- **Row-Level Security (RLS)** — Database-level access control policies
- **Auto-generated REST API** — CRUD endpoints generated from database schema
- **Real-time Subscriptions** — WebSocket-based live data streaming
- **Storage** — File storage with access policies

### Supabase Project Configuration

| Setting | Value |
|---------|-------|
| **Project Name** | myth-guider |
| **Project Reference** | dhyentqwrceboqrcuysp |
| **Region** | Singapore (ap-southeast-1) |
| **PostgreSQL Version** | 15 |
| **API URL** | https://dhyentqwrceboqrcuysp.supabase.co |
| **Auth Provider** | Email/password (email confirmation disabled for instant sign-ups) |

### Supabase Client Initialization

**File:** `src/lib/supabase.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    lock: {
      navigator: { locks: { request: (_name: string, cb: () => void) => cb() } },
    },
  },
});
```

**Notable:** The `navigator.locks` is bypassed with a no-op callback. This prevents a known deadlock issue where Supabase's internal use of `navigator.locks` can cause REST queries to hang indefinitely when stale locks persist across page reloads.

### Role of Supabase in This Project

Supabase replaces an entire traditional backend:

1. **Database** — All data (myths, stories, comments, votes, profiles) stored in PostgreSQL tables
2. **Authentication** — User registration, login, session management, JWT tokens
3. **Authorization** — RLS policies enforce who can read/write what data at the database level
4. **API** — Auto-generated REST endpoints accessed via the Supabase JS SDK
5. **Serverless Functions** — PL/pgSQL functions for atomic operations (voting, view counting)
6. **Profile Management** — Database trigger auto-creates a profile row when a user signs up

This means the application has **zero custom backend code** — no Express server, no API routes, no middleware. Everything is handled by Supabase's infrastructure and the client-side service layer.

---

## 9. Authentication System

### Implementation

**File:** `src/contexts/AuthContext.tsx` (130 lines)

The authentication system is built on Supabase Auth and exposed via React Context:

```typescript
interface AuthContextType {
  user: User | null;           // Supabase auth user object
  profile: Profile | null;     // Extended profile from profiles table
  isLoading: boolean;          // Auth state loading indicator
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;            // Derived: profile?.role === 'admin'
  isModerator: boolean;        // Derived: profile?.role === 'moderator'
}
```

### Auth Flow

1. **Sign Up:**
   - User submits email, password, and name via the AuthPage form
   - `supabase.auth.signUp()` creates the auth user
   - A PostgreSQL trigger (`handle_new_user`) automatically creates a row in the `profiles` table with the user's name, email, and default role `'user'`
   - The `onAuthStateChange` listener detects the new session and fetches the profile

2. **Sign In:**
   - User submits email and password
   - `supabase.auth.signInWithPassword()` authenticates and returns a session
   - The `onAuthStateChange` listener fetches the user's profile from the `profiles` table
   - The profile includes the user's role (user, moderator, or admin)

3. **Session Persistence:**
   - Sessions are stored in `localStorage` via the Supabase client
   - On page load, the `onAuthStateChange` listener with the `INITIAL_SESSION` event restores the session
   - The profile is re-fetched on every auth state change

4. **Sign Out:**
   - `supabase.auth.signOut()` clears the session
   - State is reset: user = null, profile = null

### Route Protection (RequireAuth)

```typescript
function RequireAuth({ children, requireRole, fallbackPath }) {
  const { user, profile, isLoading, isAdmin, isModerator } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <Navigate to={fallbackPath || "/auth"} />;
  if (requireRole === "admin" && !isAdmin) return <Navigate to={fallbackPath} />;
  if (requireRole === "moderator" && !isModerator && !isAdmin) return <Navigate to={fallbackPath} />;

  return children;
}
```

### User Roles

| Role | Permissions |
|------|------------|
| **user** (default) | Read myths/stories, submit stories, comment, vote |
| **moderator** | All user permissions + view pending comments/stories, approve comments |
| **admin** | All permissions + CRUD myths, manage stories, delete comments, change user roles |

The admin account is: `admin@mythguider.pk` (role set directly in the profiles table).

---

## 10. Database Schema & Design

### Entity-Relationship Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   profiles   │     │    myths     │     │   stories    │
│──────────────│     │──────────────│     │──────────────│
│ id (PK, FK)  │◄────│ created_by   │     │ author_id    │───►│
│ name         │     │ title        │     │ title        │
│ email        │     │ summary      │     │ author_name  │
│ role         │     │ content      │     │ content      │
│ avatar_url   │     │ status       │     │ full_content │
│ created_at   │     │ category     │     │ category     │
│ updated_at   │     │ sources      │     │ status       │
│              │     │ views        │     │ likes        │
│              │     │ likes        │     │ published_at │
│              │     │ dislikes     │     │ created_at   │
│              │     │ published_at │     │ updated_at   │
│              │     │ created_at   │     └──────┬───────┘
│              │     │ updated_at   │            │
│              │     └──────┬───────┘            │
│              │            │                    │
│              │     ┌──────┴────────────────────┤
│              │     │                           │
│         ┌────┤  ┌──┴───────────┐  ┌───────────┴──┐
│         │    │  │   comments   │  │    votes     │
│         │    │  │──────────────│  │──────────────│
│         └────┼──│ user_id (FK) │  │ user_id (FK) │──►│
│              │  │ myth_id (FK) │  │ myth_id (FK) │
│              │  │ story_id(FK) │  │ story_id(FK) │
│              │  │ content      │  │ vote_type    │
│              │  │ user_name    │  │ created_at   │
│              │  │ status       │  └──────────────┘
│              │  │ created_at   │
│              │  └──────────────┘
└──────────────┘
```

### Table: profiles

Extends the Supabase `auth.users` table with application-specific data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PK, FK → auth.users(id) ON DELETE CASCADE | Matches the auth user's UUID |
| `name` | text | NOT NULL | Display name |
| `email` | text | NOT NULL, UNIQUE | User's email address |
| `role` | text | CHECK (user\|moderator\|admin), DEFAULT 'user' | Authorization role |
| `avatar_url` | text | Nullable | Profile picture URL |
| `created_at` | timestamptz | DEFAULT now() | Account creation time |
| `updated_at` | timestamptz | DEFAULT now() | Last profile update |

**Trigger:** `on_auth_user_created` — Automatically inserts a profile row when a new user signs up via Supabase Auth.

### Table: myths

Core content table storing fact-checked myths.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PK, DEFAULT gen_random_uuid() | Unique myth identifier |
| `title` | text | NOT NULL | Myth title/claim |
| `summary` | text | Nullable | Brief summary of the fact-check |
| `content` | text | Nullable | Full detailed analysis (supports markdown/HTML) |
| `status` | text | CHECK (verified\|debunked\|partial), DEFAULT 'debunked' | Fact-check verdict |
| `category` | text | CHECK (Health\|Cultural\|Historical\|Social), NOT NULL | Classification category |
| `sources` | jsonb | DEFAULT '[]' | Array of {name, url} source references |
| `views` | integer | DEFAULT 0 | View counter |
| `likes` | integer | DEFAULT 0 | Like counter |
| `dislikes` | integer | DEFAULT 0 | Dislike counter |
| `published_at` | timestamptz | DEFAULT now() | Publication date |
| `created_by` | uuid | FK → profiles(id) | Admin who created the myth |
| `created_at` | timestamptz | DEFAULT now() | Record creation time |
| `updated_at` | timestamptz | DEFAULT now() | Last update time |

**Indexes:** `category`, `status`, `views DESC`, `published_at DESC`

### Table: stories

Community-submitted cultural stories and folklore.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PK, DEFAULT gen_random_uuid() | Unique story identifier |
| `title` | text | NOT NULL | Story title |
| `author_name` | text | NOT NULL | Author's display name |
| `author_id` | uuid | FK → profiles(id) | Author's profile reference |
| `content` | text | Nullable | Story excerpt/preview |
| `full_content` | text | Nullable | Complete story text |
| `category` | text | CHECK (Folklore\|Supernatural\|Urban Legends\|Historical\|Regional), NOT NULL | Story category |
| `status` | text | CHECK (published\|pending), DEFAULT 'pending' | Publication status |
| `likes` | integer | DEFAULT 0 | Like counter |
| `published_at` | timestamptz | Nullable | Set when admin publishes |
| `created_at` | timestamptz | DEFAULT now() | Submission time |
| `updated_at` | timestamptz | DEFAULT now() | Last update time |

**Indexes:** `category`, `status`, `published_at DESC`

### Table: comments

Polymorphic comment system supporting both myths and stories.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PK, DEFAULT gen_random_uuid() | Unique comment identifier |
| `user_id` | uuid | FK → profiles(id) | Commenter's profile |
| `user_name` | text | NOT NULL | Commenter's display name |
| `content` | text | NOT NULL | Comment text |
| `myth_id` | uuid | FK → myths(id) ON DELETE CASCADE, Nullable | Associated myth (if comment is on a myth) |
| `story_id` | uuid | FK → stories(id) ON DELETE CASCADE, Nullable | Associated story (if comment is on a story) |
| `status` | text | CHECK (approved\|pending), DEFAULT 'pending' | Moderation status |
| `created_at` | timestamptz | DEFAULT now() | Comment creation time |

**Constraint:** `comment_target_check` — Exactly one of `myth_id` or `story_id` must be non-null (XOR constraint).

**Indexes:** `myth_id` (partial, WHERE myth_id IS NOT NULL), `story_id` (partial, WHERE story_id IS NOT NULL), `status`

### Table: votes

Polymorphic voting system supporting likes/dislikes on myths and likes on stories.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PK, DEFAULT gen_random_uuid() | Unique vote identifier |
| `user_id` | uuid | FK → profiles(id) ON DELETE CASCADE | Voter's profile |
| `myth_id` | uuid | FK → myths(id) ON DELETE CASCADE, Nullable | Voted myth |
| `story_id` | uuid | FK → stories(id) ON DELETE CASCADE, Nullable | Voted story |
| `vote_type` | text | CHECK (like\|dislike) | Type of vote |
| `created_at` | timestamptz | DEFAULT now() | Vote creation time |

**Constraints:**
- `vote_target_check` — Exactly one of `myth_id` or `story_id` must be non-null
- `unique_myth_vote` — UNIQUE(user_id, myth_id) — one vote per user per myth
- `unique_story_vote` — UNIQUE(user_id, story_id) — one vote per user per story

**Note:** Stories only support `'like'` votes (not dislike), while myths support both.

### Design Decisions

1. **Polymorphic tables** (comments, votes): A single table serves both myths and stories using nullable foreign keys with an XOR constraint. This simplifies the schema while maintaining referential integrity.

2. **Denormalized counters** (views, likes, dislikes on myths/stories): Instead of counting votes with a JOIN query every time, the counters are maintained atomically by PL/pgSQL functions. This trades slight write complexity for significantly faster reads.

3. **JSONB sources**: The `sources` column on myths uses JSONB to store an array of `{name, url}` objects, allowing flexible source management without a separate table.

4. **Profile auto-creation**: A database trigger on `auth.users` insertion automatically creates a profile row, ensuring every authenticated user always has a profile.

---

## 11. Row-Level Security (RLS)

**File:** `supabase/rls.sql`

All tables have RLS enabled, enforcing access control at the database level. This means even if a client sends a malicious query, PostgreSQL itself will deny unauthorized access.

### Profiles

| Operation | Policy | Condition |
|-----------|--------|-----------|
| SELECT | Everyone can view profiles | `true` |
| UPDATE | Users can update own profile | `auth.uid() = id` |
| UPDATE | Admins can update any profile | User's role = 'admin' |

### Myths

| Operation | Policy | Condition |
|-----------|--------|-----------|
| SELECT | Everyone can view myths | `true` |
| INSERT | Only admins can create myths | User's role = 'admin' |
| UPDATE | Only admins can update myths | User's role = 'admin' |
| DELETE | Only admins can delete myths | User's role = 'admin' |

### Stories

| Operation | Policy | Condition |
|-----------|--------|-----------|
| SELECT | Everyone sees published stories | `status = 'published'` |
| SELECT | Admins/moderators see all stories | User's role IN ('admin', 'moderator') |
| INSERT | Authenticated users can submit | `auth.uid() IS NOT NULL` |
| UPDATE | Only admins can update stories | User's role = 'admin' |
| DELETE | Only admins can delete stories | User's role = 'admin' |

### Comments

| Operation | Policy | Condition |
|-----------|--------|-----------|
| SELECT | Everyone sees approved comments | `status = 'approved'` |
| SELECT | Admins/moderators see all comments | User's role IN ('admin', 'moderator') |
| INSERT | Authenticated users can comment | `auth.uid() IS NOT NULL` |
| UPDATE | Admins/moderators can moderate | User's role IN ('admin', 'moderator') |
| DELETE | Only admins can delete comments | User's role = 'admin' |

### Votes

| Operation | Policy | Condition |
|-----------|--------|-----------|
| SELECT | Everyone can view votes | `true` |
| INSERT | Users can cast their own votes | `auth.uid() = user_id` |
| UPDATE | Users can update their own votes | `auth.uid() = user_id` |
| DELETE | Users can remove their own votes | `auth.uid() = user_id` |

### Admin Role Check Pattern

All admin/moderator checks use a helper query:
```sql
EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.id = auth.uid()
  AND profiles.role = 'admin'
)
```

---

## 12. Database Functions (PL/pgSQL)

**File:** `supabase/functions.sql`

Three server-side functions handle atomic operations that require transaction-level consistency:

### cast_myth_vote(p_myth_id uuid, p_user_id uuid, p_vote_type text)

Handles the toggle logic for myth voting:

- **No existing vote:** INSERT the new vote, INCREMENT the appropriate counter (likes or dislikes)
- **Same vote type exists:** DELETE the vote (toggle off), DECREMENT the counter
- **Different vote type exists:** UPDATE the vote type, DECREMENT the old counter and INCREMENT the new one

This runs as a single transaction, preventing race conditions where two concurrent requests could produce inconsistent counters.

### cast_story_vote(p_story_id uuid, p_user_id uuid)

Handles story like toggling (stories only support likes, not dislikes):

- **Vote exists:** DELETE the vote, DECREMENT likes counter
- **No vote exists:** INSERT the vote with type 'like', INCREMENT likes counter

### increment_myth_views(p_myth_id uuid)

Simple fire-and-forget function that increments a myth's view counter by 1. Called when a user navigates to a myth detail page.

---

## 13. Service Layer (Data Access)

**Location:** `src/services/`

The service layer contains pure async functions that interact with the Supabase client. These functions have zero React dependencies and can be tested independently.

### myths.ts (92 lines)

```typescript
// Query functions
fetchMyths(filters?: MythFilters)      // List myths with category, status, search, ordering, pagination
fetchMythById(id: string)              // Single myth by ID
fetchMythCategoryCounts()              // Count myths per category

// Mutation functions
createMyth(myth: MythInsert)           // Create a new myth (admin only)
updateMyth(id: string, updates: MythUpdate) // Update existing myth
deleteMyth(id: string)                 // Delete a myth

// RPC functions
incrementMythViews(id: string)         // Call increment_myth_views PostgreSQL function
```

**Filter interface:**
```typescript
interface MythFilters {
  category?: string;
  status?: string;
  search?: string;
  orderBy?: 'views' | 'published_at' | 'likes';
  limit?: number;
  offset?: number;
}
```

### stories.ts (69 lines)

```typescript
fetchStories(filters?: StoryFilters)
fetchStoryById(id: string)
createStory(story: StoryInsert)
updateStory(id: string, updates: StoryUpdate)
deleteStory(id: string)
```

### comments.ts (63 lines)

```typescript
fetchComments(filters?: { mythId?: string; storyId?: string; status?: string })
fetchAllComments()                     // For admin moderation panel
createComment(comment: CommentInsert)
updateCommentStatus(id: string, status: string) // Approve/reject
deleteComment(id: string)
```

### votes.ts (40 lines)

```typescript
castMythVote(mythId: string, userId: string, voteType: 'like' | 'dislike')
castStoryVote(storyId: string, userId: string)
getUserMythVote(mythId: string, userId: string)  // Returns vote_type or null
getUserStoryVote(storyId: string, userId: string) // Returns boolean
```

### profiles.ts (31 lines)

```typescript
fetchProfiles()                        // All profiles (admin use)
fetchProfileById(id: string)           // Single profile
updateProfileRole(id: string, role: string) // Change user role
```

### gemini.ts (52 lines)

Documented separately in [Section 15: AI Chatbot](#15-ai-chatbot--gemini-integration).

---

## 14. React Query Integration (Hooks Layer)

**Location:** `src/hooks/`

Each service module has a corresponding hooks file that wraps the service functions with React Query's `useQuery` and `useMutation`:

### useMyths.ts (71 lines)

| Hook | Type | Query Key | Description |
|------|------|-----------|-------------|
| `useMyths(filters)` | Query | `['myths', filters]` | Fetch filtered myth list |
| `useMyth(id)` | Query | `['myth', id]` | Fetch single myth |
| `useMythCategoryCounts()` | Query | `['mythCategoryCounts']` | Category statistics |
| `useCreateMyth()` | Mutation | Invalidates `['myths']` | Create myth |
| `useUpdateMyth()` | Mutation | Invalidates `['myths']` | Update myth |
| `useDeleteMyth()` | Mutation | Invalidates `['myths']` | Delete myth |
| `useIncrementViews()` | Mutation | No invalidation | Increment view counter |

### useStories.ts (56 lines)

| Hook | Type | Query Key | Description |
|------|------|-----------|-------------|
| `useStories(filters)` | Query | `['stories', filters]` | Fetch filtered story list |
| `useStory(id)` | Query | `['story', id]` | Fetch single story |
| `useCreateStory()` | Mutation | Invalidates `['stories']` | Submit story |
| `useUpdateStory()` | Mutation | Invalidates `['stories']` | Update story |
| `useDeleteStory()` | Mutation | Invalidates `['stories']` | Delete story |

### useComments.ts (54 lines)

| Hook | Type | Query Key | Description |
|------|------|-----------|-------------|
| `useComments(filters)` | Query | `['comments', filters]` | Fetch filtered comments |
| `useAllComments()` | Query | `['allComments']` | All comments (admin) |
| `useCreateComment()` | Mutation | Invalidates `['comments']` | Post comment |
| `useApproveComment()` | Mutation | Invalidates both query keys | Approve comment |
| `useDeleteComment()` | Mutation | Invalidates both query keys | Delete comment |

### useVotes.ts (44 lines)

| Hook | Type | Query Key | Description |
|------|------|-----------|-------------|
| `useCastMythVote()` | Mutation | Invalidates myths + votes | Cast/toggle myth vote |
| `useCastStoryVote()` | Mutation | Invalidates stories + votes | Cast/toggle story vote |
| `useGetUserMythVote(mythId, userId)` | Query | `['userMythVote', ...]` | Get user's vote on a myth |
| `useGetUserStoryVote(storyId, userId)` | Query | `['userStoryVote', ...]` | Get user's vote on a story |

### Cache Invalidation Strategy

When a mutation succeeds, related queries are invalidated to trigger a refetch:
```typescript
const queryClient = useQueryClient();

useMutation({
  mutationFn: createMyth,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['myths'] });
  },
});
```

This ensures the UI always reflects the latest server state without manual cache updates.

---

## 15. AI Chatbot — Gemini Integration

### Overview

The chatbot is a real-time AI-powered myth fact-checker that uses Google's **Gemini 3 Flash Preview** model. Users can ask about any Pakistani myth, superstition, or cultural belief, and the AI responds with a structured fact-check including a verdict, key points, and credible sources.

### Service: `src/services/gemini.ts` (52 lines)

**SDK:** `@google/genai` v1.47.0 (Google's official Generative AI SDK for JavaScript)

**Initialization:**
```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
```

**Chat Session Creation:**
```typescript
export function createChatSession() {
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  });
}
```

The chat session is stateful — it automatically maintains the full conversation history internally, so follow-up questions work naturally (e.g., "tell me more about that" or "what about in Punjab?").

**Streaming Response:**
```typescript
export async function* sendMessageStreaming(chat, message: string) {
  const stream = await chat.sendMessageStream({ message });
  for await (const chunk of stream) {
    if (chunk.text) yield chunk.text;
  }
}
```

This is an async generator function that yields text chunks as they arrive from the Gemini API, enabling a real-time typing effect in the UI.

### System Prompt

The AI is configured with a detailed system prompt that:

1. **Defines the persona:** "Pakistani Myth Guider AI" — an expert fact-checker specializing in Pakistani myths, superstitions, folklore, health myths, cultural beliefs, and social misconceptions
2. **Enforces response format:** Structured fact-checks with Verdict, Summary, Key Points, and Sources
3. **Sets cultural sensitivity:** Respectful of Pakistani culture while being factually accurate
4. **Enables multilingual:** Responds in the language the user writes in (English, Urdu, or Punjabi)
5. **Handles uncertainty:** Uses "Under Review" or "Partially True" when evidence is mixed
6. **Scopes the AI:** Redirects off-topic questions back to myth-related topics

### Verdict Types

| Verdict | Meaning |
|---------|---------|
| Verified | The belief/claim is supported by evidence |
| Debunked | The belief/claim is false according to evidence |
| Partially True | Some truth but significant nuance or exceptions |
| Under Review | Insufficient or conflicting evidence |

### Frontend: `src/pages/ChatbotPage.tsx` (239 lines)

**Features:**
- **Streaming responses** — Text appears word-by-word as the AI generates it
- **Markdown rendering** — Bot responses render with bold, bullets, headings via `react-markdown`
- **Suggested questions** — 6 pre-built myth questions shown on initial load for quick starts
- **Auto-scroll** — Chat automatically scrolls to the latest message
- **Auto-resizing textarea** — Input grows up to 120px as the user types
- **Typing indicator** — Animated bouncing dots while waiting for the first stream chunk
- **Streaming cursor** — Blinking cursor after partial content while response is still arriving
- **Error handling** — Graceful fallback message if the API request fails
- **Islamic geometric pattern** — Subtle SVG background pattern at 2.5% opacity for cultural texture

**Message State:**
```typescript
interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;  // True while receiving chunks
}
```

**Suggested Questions:**
1. "Is eating rice at night unhealthy?"
2. "Do black cats bring bad luck?"
3. "Can mixing milk and fish cause skin disease?"
4. "Is breaking a mirror 7 years of bad luck?"
5. "Does cracking knuckles cause arthritis?"
6. "Is the number 13 really unlucky in Pakistan?"

### Model Configuration

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Model** | gemini-3-flash-preview | Fast inference, good quality, cost-effective for real-time chat |
| **Temperature** | 0.7 | Balanced between creativity and accuracy — not too deterministic, not too random |
| **Max Output Tokens** | 2048 | Enough for detailed fact-checks while keeping responses concise |
| **Streaming** | Enabled | Essential for real-time typing effect and responsive UX |

### API Key Management

The Gemini API key is stored in `.env.local` as `VITE_GEMINI_API_KEY` and accessed via `import.meta.env`. Since this is a client-side SPA, the key is exposed in the browser. For production, it should be restricted via Google Cloud Console to specific HTTP referrers.

---

## 16. Internationalization (i18n)

### Implementation

**File:** `src/contexts/LanguageContext.tsx` (434 lines)

The application supports three languages with a custom i18n solution (no external library):

| Language | Code | Direction | Script |
|----------|------|-----------|--------|
| English | `en` | LTR | Latin |
| Urdu | `ur` | RTL | Nastaliq/Arabic |
| Punjabi | `pn` | RTL | Shahmukhi/Arabic |

### Architecture

```typescript
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;  // Translation function
}>();
```

The `t()` function performs a simple key lookup against a translations object. If the key is not found in the current language, it falls back to English.

### Features

- **Language persistence:** Selected language stored in `localStorage` and restored on page load
- **RTL/LTR switching:** `document.documentElement.dir` is set to `"rtl"` for Urdu and Punjabi, `"ltr"` for English
- **HTML lang attribute:** `document.documentElement.lang` is set to `"en"`, `"ur"`, or `"pa"`
- **Language switcher:** Three buttons in the Navbar: "English", "اردو", "پنجابی"

### Translation Coverage

135+ translation keys organized by section:

| Section | Key Count | Examples |
|---------|-----------|---------|
| Navigation | 7 | nav.home, nav.categories, nav.chatbot |
| Brand | 2 | brand.name, brand.tagline |
| Hero | 10 | hero.title1-3, hero.subtitle, hero.searchPlaceholder |
| Categories | 15+ | categories.health.title, categories.cultural.desc |
| Trending | 12 | trending.title, trending.filters, trending.noResults |
| Chatbot CTA | 8 | chatbot.title, chatbot.factCheck, chatbot.storytelling |
| Footer | 12 | footer.categories, footer.quickLinks, footer.copyright |
| About | 20+ | about.title, about.mission, about.teamTitle |
| Status | 3 | status.verified, status.debunked, status.partial |
| Common | 5 | common.views, common.likes, common.readMore |

---

## 17. Styling, Theming & Animations

### Tailwind CSS Configuration

**File:** `tailwind.config.ts`

The design system uses a Pakistani heritage-inspired color palette:

### Color Palette

#### Light Mode

| Token | HSL Value | Visual | Usage |
|-------|-----------|--------|-------|
| `--primary` | 160 60% 28% | Emerald Green | Primary actions, links, buttons (Pakistani flag inspired) |
| `--primary-foreground` | 45 30% 97% | Cream | Text on primary backgrounds |
| `--secondary` | 40 70% 50% | Warm Gold | Accents, highlights, secondary actions |
| `--accent` | 35 85% 55% | Rich Amber | Additional emphasis, decorative elements |
| `--background` | 45 30% 97% | Soft Cream | Page backgrounds |
| `--foreground` | 210 25% 15% | Charcoal | Primary text |
| `--muted` | 45 20% 92% | Light Gray | Secondary backgrounds, disabled states |
| `--muted-foreground` | 210 15% 45% | Medium Gray | Secondary text |
| `--destructive` | 0 72% 51% | Red | Errors, destructive actions |
| `--verified` | 142 71% 45% | Green | Verified myth badge |
| `--debunked` | 0 72% 51% | Red | Debunked myth badge |
| `--partial` | 45 93% 47% | Gold/Amber | Partially true myth badge |

#### Dark Mode

All colors have dark mode variants with adjusted lightness values for proper contrast (e.g., primary shifts to `160 55% 45%` for visibility against dark backgrounds).

### Typography

| Font | Family | Usage |
|------|--------|-------|
| **Playfair Display** | Serif | Display headings (h1-h3), brand name, hero text |
| **DM Sans** | Sans-serif | Body text, UI elements, buttons, navigation |

Both fonts are loaded from Google Fonts with weights 300-700.

### Custom CSS Classes

**File:** `src/index.css` (242 lines)

| Class | Effect |
|-------|--------|
| `.text-gradient` | Gradient text using primary → secondary colors |
| `.bg-hero-gradient` | Hero section background gradient |
| `.bg-card-gradient` | Subtle card gradient |
| `.shadow-soft` | Light 4px box shadow |
| `.shadow-card` | Medium 8px box shadow for cards |
| `.shadow-glow` | Glowing shadow with primary color |

### Animations

| Animation | Duration | Effect |
|-----------|----------|--------|
| `fade-in` | 0.6s ease-out | Entrance with opacity 0→1 + translateY 10px→0 |
| `slide-up` | 0.8s ease-out | Larger vertical entrance, translateY 30px→0 |
| `float` | 4s infinite | Subtle floating motion for decorative elements |
| `shimmer` | 2s infinite | Skeleton loading shimmer effect |
| `accordion-down/up` | 0.2s ease-out | Radix accordion expand/collapse |

### Stagger Pattern

The `.stagger-children` class applies sequential `animation-delay` to child elements (0.1s to 0.6s), creating a cascading entrance effect for lists and grids.

### Glassmorphism

Used in the Navbar: `bg-background/80 backdrop-blur-md` — semi-transparent background with blur effect.

---

## 18. Page-by-Page Breakdown

### Index (Home Page) — `src/pages/Index.tsx` (23 lines)

Composition of section components:
1. Navbar
2. HeroSection — Full-height hero with animated blobs, search bar, and stats
3. CategoriesSection — 4 category cards with hover effects
4. TrendingSection — Popular myths carousel
5. ChatbotCTA — Dual chatbot call-to-action
6. Footer

### AuthPage — `src/pages/AuthPage.tsx` (200 lines)

- Tabbed interface: Sign In / Sign Up
- Email and password form fields with validation
- Name field for sign-up
- Error handling with toast notifications
- Redirects to home on successful auth

### AdminDashboard — `src/pages/AdminDashboard.tsx` (678 lines)

The largest page component, featuring a sidebar-based admin panel:

- **Dashboard Tab:** Statistics cards (total myths, stories, comments, users), recent activity
- **Myths Tab:** Full CRUD table with create/edit dialog, category/status filters
- **Stories Tab:** Review and publish pending stories
- **Comments Tab:** Moderate pending comments (approve/delete)
- **Users Tab:** View all users, change roles (user/moderator/admin)

### ChatbotPage — `src/pages/ChatbotPage.tsx` (239 lines)

Documented in [Section 15](#15-ai-chatbot--gemini-integration).

### MythDetail — `src/pages/MythDetail.tsx` (263 lines)

- Full myth content with markdown/HTML rendering
- Status badge (Verified/Debunked/Partially True) with color coding
- Source references with external links
- View counter (auto-increments on page load)
- Like/dislike voting (authenticated users only)
- Comment section with posting and moderation

### StoryDetail — `src/pages/StoryDetail.tsx` (221 lines)

- Full story content with author attribution
- Category badge
- Like button (authenticated users only)
- Comment section

### CategoriesPage — `src/pages/CategoriesPage.tsx` (155 lines)

- Grid of myths filtered by URL parameter (`:category`)
- Category overview when no filter is applied
- Myth count per category
- Search within category

### TrendingPage — `src/pages/TrendingPage.tsx` (196 lines)

- Myths sorted by views/engagement
- Category and status filter dropdowns
- Clear filters option

### StorytellingPage — `src/pages/StorytellingPage.tsx` (461 lines)

- Interactive storytelling interface
- Browse published stories by category
- Submit new stories (authenticated users)

### AboutPage — `src/pages/AboutPage.tsx` (178 lines)

- Mission statement and vision
- Platform statistics
- Core values (Accuracy, Integrity, Community, Preservation)
- Team section
- Contact information

---

## 19. Component Architecture

### Layout Components

| Component | File | Lines | Purpose |
|-----------|------|-------|---------|
| **Navbar** | `src/components/Navbar.tsx` | 138 | Fixed top nav with links, language switcher, user menu, mobile menu |
| **Footer** | `src/components/Footer.tsx` | 124 | 4-column footer with links, social icons, contact info |
| **UserMenu** | `src/components/UserMenu.tsx` | 104 | Avatar dropdown with profile info, role badge, admin link, sign out |
| **ScrollToTop** | `src/components/ScrollToTop.tsx` | 14 | Scroll to top on route change |

### Section Components

| Component | File | Lines | Purpose |
|-----------|------|-------|---------|
| **HeroSection** | `src/components/HeroSection.tsx` | 108 | Landing page hero with search, stats, animated blobs |
| **CategoriesSection** | `src/components/CategoriesSection.tsx` | 105 | 4-category card grid with hover effects |
| **TrendingSection** | `src/components/TrendingSection.tsx` | 116 | Popular myths display with "View All" |
| **ChatbotCTA** | `src/components/ChatbotCTA.tsx` | 107 | Dual chatbot call-to-action section |
| **NavLink** | `src/components/NavLink.tsx` | 28 | Reusable nav link with active state |

### UI Components (shadcn/ui)

52 components in `src/components/ui/`, each a self-contained file. Key ones used across the app:

- **Button** — 10 variants (default, destructive, outline, secondary, ghost, link, hero, heroOutline, gold, admin) with 5 sizes
- **Card** — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Dialog** — Modal dialogs for create/edit forms
- **ScrollArea** — Custom scrollbar for chat messages
- **Tabs** — Admin dashboard tab navigation
- **Badge** — Status badges (verified, debunked, partial)
- **Avatar** — User avatars with initials fallback
- **Skeleton** — Loading state placeholders
- **Table** — Admin data tables

---

## 20. Form Handling & Validation

### React Hook Form + Zod

Forms use React Hook Form for state management and Zod for schema validation:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { email: "", password: "" },
});
```

### Forms in the Application

| Form | Location | Fields | Validation |
|------|----------|--------|------------|
| **Sign In** | AuthPage | Email, password | Email format, required fields |
| **Sign Up** | AuthPage | Name, email, password | Email format, min password length, required name |
| **Admin Login** | AdminLogin | Email, password | Email format, required fields |
| **Create Myth** | AdminDashboard | Title, summary, content, category, status, sources | Required title, category |
| **Edit Myth** | AdminDashboard | Same as create | Same validations |
| **Submit Story** | StorytellingPage | Title, content, category | Required fields |
| **Post Comment** | MythDetail/StoryDetail | Content | Non-empty content |

---

## 21. Type System

**File:** `src/types/supabase.ts` (197 lines)

All database entities have corresponding TypeScript types derived from the Supabase schema:

### Core Types

```typescript
type Profile = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

type Myth = {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  status: 'verified' | 'debunked' | 'partial';
  category: 'Health' | 'Cultural' | 'Historical' | 'Social';
  sources: Array<{ name: string; url: string }>;
  views: number;
  likes: number;
  dislikes: number;
  published_at: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

type Story = {
  id: string;
  title: string;
  author_name: string;
  author_id: string | null;
  content: string | null;
  full_content: string | null;
  category: 'Folklore' | 'Supernatural' | 'Urban Legends' | 'Historical' | 'Regional';
  status: 'published' | 'pending';
  likes: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type Comment = {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  myth_id: string | null;
  story_id: string | null;
  status: 'approved' | 'pending';
  created_at: string;
};

type Vote = {
  id: string;
  user_id: string;
  myth_id: string | null;
  story_id: string | null;
  vote_type: 'like' | 'dislike';
  created_at: string;
};
```

### Insert/Update Types

Separate types for mutations that omit auto-generated fields:
- `MythInsert` — Omits id, views, likes, dislikes, created_at, updated_at
- `MythUpdate` — Partial of MythInsert
- `StoryInsert` — Omits id, likes, created_at, updated_at
- `StoryUpdate` — Partial of StoryInsert
- `CommentInsert` — Omits id, status, created_at

---

## 22. Environment Variables & Configuration

### .env.local

A `.env.example` at the repo root documents these names (copy it to `.env.local` and fill in real values; `.env.local` is git-ignored).

| Variable | Purpose | Sensitivity |
|----------|---------|-------------|
| `VITE_SUPABASE_URL` | Supabase project REST API URL | Low (public) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public API key (safe for client-side — RLS enforces security) | Low (public) |
| `OPENAI_API_KEY` | OpenAI API key used by the chatbot and storyteller features | **High** — server-only. Deliberately **not** prefixed `VITE_`, so Vite never inlines it into the client bundle. It is read only inside `api/chat.ts` and `api/story.ts` (Vercel Edge Functions); the browser never sees it. |

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration, dev server, plugins, path aliases |
| `tailwind.config.ts` | Tailwind CSS theme customization, colors, fonts, animations, plugins |
| `tsconfig.json` | Root TypeScript config (references app and node configs) |
| `tsconfig.app.json` | App-specific TS config (target, module, paths, compiler options) |
| `tsconfig.node.json` | Node-side TS config (for vite.config.ts) |
| `components.json` | shadcn/ui component configuration (style, aliases, paths) |
| `postcss.config.js` | PostCSS pipeline (Tailwind CSS + Autoprefixer) |
| `eslint.config.js` | ESLint v9 flat configuration |
| `vercel.json` | Vercel deployment config (SPA rewrites) |

---

## 23. Build, Scripts & Tooling

### npm Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start development server with HMR on localhost:8080 |
| `build` | `vite build` | Production build → `dist/` directory |
| `build:dev` | `vite build --mode development` | Development build (unminified, with source maps) |
| `lint` | `eslint .` | Run ESLint across entire codebase |
| `preview` | `vite preview` | Preview production build locally |

### Build Output

Production build generates:
- `dist/index.html` — Entry HTML file (~1.1 KB)
- `dist/assets/index-*.css` — Compiled CSS (~104 KB, ~16 KB gzipped)
- `dist/assets/index-*.js` — Compiled JS bundle (~1,080 KB, ~284 KB gzipped)
- `dist/assets/hero-bg-*.jpg` — Hero background image (~310 KB)

---

## 24. Deployment — Vercel

### Configuration

**File:** `vercel.json`
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This single rewrite rule ensures all routes are handled by the SPA's client-side router. Without it, direct navigation to `/chatbot` or `/myth/123` would return a 404 from Vercel's static file server.

### Deployment Steps

1. **Connect repository** to Vercel (GitHub integration)
2. **Set environment variables** in Vercel dashboard (Project Settings → Environment Variables):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY` — **no** `VITE_` prefix; this is consumed only by the `api/chat.ts` and `api/story.ts` serverless functions, never by client code
3. **Build settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Vercel auto-detects the top-level `api/` directory as serverless/edge functions — no extra config needed
4. **Deploy** — Vercel auto-deploys on push to main

### Production Considerations

- **OpenAI API Key:** Kept server-side only (`OPENAI_API_KEY` in `api/chat.ts`/`api/story.ts`) and is never bundled into client JS, so it can't be extracted from the browser. As a safety net, set a monthly usage limit on the key in the OpenAI dashboard.
- **Supabase CORS:** Configure allowed origins in Supabase dashboard to only allow your Vercel domain
- **Custom Domain:** Configure in Vercel dashboard under Domains settings

---

## 25. Directory Structure

```
mynt-dashboard/
├── public/                          # Static assets
│   └── hero-bg.jpg                  # Hero section background image
├── src/
│   ├── components/
│   │   ├── ui/                      # 52 shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx           # 10 variants, 5 sizes
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ... (39 more)
│   │   ├── Navbar.tsx               # Fixed top navigation
│   │   ├── Footer.tsx               # Multi-column footer
│   │   ├── UserMenu.tsx             # Auth dropdown menu
│   │   ├── HeroSection.tsx          # Landing page hero
│   │   ├── CategoriesSection.tsx    # Category card grid
│   │   ├── TrendingSection.tsx      # Popular myths display
│   │   ├── ChatbotCTA.tsx           # Chatbot call-to-action
│   │   ├── NavLink.tsx              # Reusable nav link
│   │   └── ScrollToTop.tsx          # Route-change scroll handler
│   ├── contexts/
│   │   ├── AuthContext.tsx          # Authentication state + RequireAuth
│   │   └── LanguageContext.tsx      # i18n with 3 languages (434 lines)
│   ├── hooks/
│   │   ├── useMyths.ts              # React Query hooks for myths
│   │   ├── useStories.ts            # React Query hooks for stories
│   │   ├── useComments.ts           # React Query hooks for comments
│   │   ├── useVotes.ts              # React Query hooks for votes
│   │   └── useProfiles.ts           # React Query hooks for profiles
│   ├── services/
│   │   ├── myths.ts                 # Myth CRUD + filters
│   │   ├── stories.ts               # Story CRUD + filters
│   │   ├── comments.ts              # Comment CRUD + moderation
│   │   ├── votes.ts                 # Vote casting + retrieval
│   │   ├── profiles.ts              # Profile management
│   │   └── gemini.ts                # Gemini AI chatbot service
│   ├── pages/
│   │   ├── Index.tsx                # Home/landing page
│   │   ├── AuthPage.tsx             # Sign In / Sign Up
│   │   ├── AdminLogin.tsx           # Admin login
│   │   ├── AdminDashboard.tsx       # Admin panel (678 lines)
│   │   ├── ChatbotPage.tsx          # Gemini AI chatbot
│   │   ├── StorytellingPage.tsx     # Interactive storytelling
│   │   ├── MythDetail.tsx           # Single myth view
│   │   ├── StoryDetail.tsx          # Single story view
│   │   ├── CategoriesPage.tsx       # Category browsing
│   │   ├── TrendingPage.tsx         # Trending myths
│   │   ├── AboutPage.tsx            # About page
│   │   └── NotFound.tsx             # 404 page
│   ├── types/
│   │   └── supabase.ts             # Database type definitions
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client initialization
│   │   └── utils.ts                # cn() utility function
│   ├── App.tsx                      # Router + providers
│   ├── main.tsx                     # React entry point
│   └── index.css                    # Global styles + theme
├── supabase/
│   ├── schema.sql                   # Table definitions (150 lines)
│   ├── rls.sql                      # Security policies (137 lines)
│   ├── functions.sql                # PL/pgSQL functions (102 lines)
│   └── seed.sql                     # Sample data (221 lines)
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Locked dependency versions
├── vite.config.ts                   # Vite configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript root config
├── tsconfig.app.json                # App TypeScript config
├── tsconfig.node.json               # Node TypeScript config
├── components.json                  # shadcn/ui config
├── postcss.config.js                # PostCSS config
├── eslint.config.js                 # ESLint v9 config
├── vercel.json                      # Vercel deployment config
├── .env.local                       # Environment variables
└── .gitignore                       # Git ignore rules
```

---

## 26. Seed Data

**File:** `supabase/seed.sql` (221 lines)

The database is pre-seeded with sample content in multiple languages:

### Myths (9 entries)

| # | Title | Language | Category | Status |
|---|-------|----------|----------|--------|
| 1 | "Eating rice at night causes weight gain" | English | Health | Debunked |
| 2 | "کالی بلی منحوس ہوتی ہے" (Black cats are unlucky) | Urdu | Cultural | Debunked |
| 3 | "مچھلی تے دودھ نال چمڑی دی بیماری ہوندی اے" (Fish + milk causes skin disease) | Punjabi | Health | Debunked |
| 4 | "Green tea boosts metabolism significantly" | English | Health | Partial |
| 5 | "انگلیاں چٹخانے سے جوڑوں کا درد ہوتا ہے" (Cracking knuckles causes arthritis) | Urdu | Health | Debunked |
| 6 | "پورے چند دا انسانی رویے تے اثر" (Full moon affects behavior) | Punjabi | Social | Partial |
| 7 | "Breaking a mirror brings 7 years bad luck" | English | Cultural | Debunked |
| 8 | "The Great Wall is visible from space" | English | Historical | Debunked |
| 9 | "We only use 10% of our brain" | English | Social | Debunked |

### Stories (5 entries)

| # | Title | Language | Category |
|---|-------|----------|----------|
| 1 | "The Legend of Peer Channan" | English | Folklore |
| 2 | "لاہور کی چڑیل کی داستان" (The Tale of Lahore's Churail) | Urdu | Supernatural |
| 3 | "ہیر رانجھے دی داستان" (The Tale of Heer Ranjha) | Punjabi | Folklore |
| 4 | "The Flying Horse of Quaid" | English | Urban Legends |
| 5 | "سسی پنوں کی المناک محبت" (The Tragic Love of Sassi Punnun) | Urdu | Folklore |

Each myth includes full content (detailed analysis), key points, sources, and appropriate view/like/dislike counts. Each story includes an excerpt and full story text.

---

## 27. Project Statistics

| Metric | Count |
|--------|-------|
| **Total Source Files (src/)** | 95+ |
| **Total Lines of Code (src/)** | ~8,500+ |
| **Pages** | 12 |
| **Custom Components** | 9 |
| **shadcn/ui Components** | 52 |
| **Services** | 6 |
| **Custom Hooks** | 7+ |
| **Database Tables** | 5 |
| **RLS Policies** | 25+ |
| **Database Functions** | 3 |
| **Routes** | 13 |
| **Supported Languages** | 3 |
| **Translation Keys** | 135+ |
| **CSS Color Variables** | 30+ |
| **Custom Animations** | 4 |
| **npm Production Dependencies** | 25+ |
| **npm Dev Dependencies** | 13 |
| **Build Size (JS)** | ~1,080 KB (~284 KB gzipped) |
| **Build Size (CSS)** | ~104 KB (~16 KB gzipped) |

---

## 28. Dependency Manifest

### Production Dependencies

| Package | Version | Category |
|---------|---------|----------|
| @google/genai | 1.47.0 | AI |
| @hookform/resolvers | 3.10.0 | Forms |
| @radix-ui/react-accordion | 1.2.11 | UI |
| @radix-ui/react-alert-dialog | 1.1.14 | UI |
| @radix-ui/react-aspect-ratio | 1.1.7 | UI |
| @radix-ui/react-avatar | 1.1.10 | UI |
| @radix-ui/react-checkbox | 1.3.2 | UI |
| @radix-ui/react-collapsible | 1.1.11 | UI |
| @radix-ui/react-context-menu | 2.2.15 | UI |
| @radix-ui/react-dialog | 1.1.14 | UI |
| @radix-ui/react-dropdown-menu | 2.1.15 | UI |
| @radix-ui/react-hover-card | 1.1.14 | UI |
| @radix-ui/react-label | 2.1.7 | UI |
| @radix-ui/react-menubar | 1.1.15 | UI |
| @radix-ui/react-navigation-menu | 1.2.13 | UI |
| @radix-ui/react-popover | 1.1.14 | UI |
| @radix-ui/react-progress | 1.1.7 | UI |
| @radix-ui/react-radio-group | 1.3.7 | UI |
| @radix-ui/react-scroll-area | 1.2.9 | UI |
| @radix-ui/react-select | 2.2.5 | UI |
| @radix-ui/react-separator | 1.1.7 | UI |
| @radix-ui/react-slider | 1.3.5 | UI |
| @radix-ui/react-slot | 1.2.3 | UI |
| @radix-ui/react-switch | 1.2.5 | UI |
| @radix-ui/react-tabs | 1.1.12 | UI |
| @radix-ui/react-toast | 1.2.14 | UI |
| @radix-ui/react-toggle | 1.1.9 | UI |
| @radix-ui/react-toggle-group | 1.1.10 | UI |
| @radix-ui/react-tooltip | 1.2.7 | UI |
| @supabase/supabase-js | 2.100.1 | Backend |
| @tanstack/react-query | 5.83.0 | State |
| class-variance-authority | 0.7.1 | Styling |
| clsx | 2.1.1 | Styling |
| cmdk | 1.1.1 | UI |
| date-fns | 3.6.0 | Utilities |
| embla-carousel-react | 8.6.0 | UI |
| input-otp | 1.4.2 | UI |
| lucide-react | 0.462.0 | Icons |
| next-themes | 0.3.0 | Theming |
| react | 18.3.1 | Core |
| react-day-picker | 8.10.1 | UI |
| react-dom | 18.3.1 | Core |
| react-hook-form | 7.61.1 | Forms |
| react-markdown | 10.1.0 | Rendering |
| react-resizable-panels | 2.1.9 | UI |
| react-router-dom | 6.30.1 | Routing |
| recharts | 2.15.4 | Charts |
| sonner | 1.7.4 | Notifications |
| tailwind-merge | 2.6.0 | Styling |
| tailwindcss-animate | 1.0.7 | Animations |
| vaul | 0.9.9 | UI |
| zod | 3.25.76 | Validation |

### Development Dependencies

| Package | Version | Category |
|---------|---------|----------|
| @eslint/js | 9.32.0 | Linting |
| @tailwindcss/typography | 0.5.16 | Styling |
| @types/node | 22.16.5 | Types |
| @types/react | 18.3.23 | Types |
| @types/react-dom | 18.3.7 | Types |
| @vitejs/plugin-react-swc | 3.11.0 | Build |
| autoprefixer | 10.4.21 | CSS |
| eslint | 9.32.0 | Linting |
| eslint-plugin-react-hooks | 5.2.0 | Linting |
| eslint-plugin-react-refresh | 0.4.20 | Linting |
| globals | 15.15.0 | Linting |
| lovable-tagger | 1.1.13 | Dev Tool |
| postcss | 8.5.6 | CSS |
| tailwindcss | 3.4.17 | Styling |
| typescript | 5.8.3 | Language |
| typescript-eslint | 8.38.0 | Linting |
| vite | 5.4.19 | Build |

---

*This document covers the complete technical specification of the Pakistani Myth Guider platform. For questions or contributions, refer to the GitHub repository.*
