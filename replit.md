# ESBEKAHH - Secret Archive

## Overview

ESBEKAHH is a themed digital archive application inspired by the anime "Spy x Family". It serves as a secure image gallery with a distinctive espionage/secret agent aesthetic. The application features a role-based access system where visitors can browse archives in read-only mode, while authenticated "agents" can upload and manage classified images.

The project is built as a single-page React application with a focus on visual polish through animations and thematic UI elements (spy motifs, garden themes, character decorations).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 19** with TypeScript for the UI layer
- **Vite** as the build tool and dev server (port 5000)
- **Framer Motion** for animations and transitions
- **Tailwind CSS** (via CDN) for styling with custom spy/garden color themes
- **Lucide React** for icons

### Application State Management
- Uses React's built-in `useState` and `useEffect` hooks
- No external state management library (Redux, Zustand, etc.)
- State flows from App.tsx down to child components via props

### View Architecture
The app has three main views managed by a `ViewState` type:
1. **Landing** - Entry screen with visitor/member path selection
2. **Login** - Agent authentication for members
3. **Dashboard** - Main archive gallery with upload capabilities

### Data Layer
- **Dual storage approach**: Local IndexedDB for offline/fast access + Supabase for cloud persistence
- **IndexedDB Service** (`services/db.ts`): Stores image metadata and binary blobs locally
- **API Service** (`services/api.ts`): Communicates with Supabase Edge Functions for cloud storage

### Image Handling
- Images are compressed on the client side before upload
- Two versions stored: high-res original and ~20kb thumbnail
- Uses `compressImageToBlob` and `compressImageToBase64` utilities in Dashboard component

### Authentication
- Simple hardcoded agent validation (agents 01-07 with master key 0009)
- No JWT or session management - authentication state held in React component
- Read-only mode for unauthenticated visitors

### Component Structure
```
App.tsx (root state management)
├── Background.tsx (animated decorative elements)
├── Landing.tsx (entry point selection)
├── Login.tsx (agent authentication)
├── Dashboard.tsx (main archive gallery + upload)
└── Icons.tsx (custom SVG icons)
```

## External Dependencies

### Supabase Integration
- **Supabase URL**: Configured via `VITE_SUPABASE_URL` environment variable
- **Edge Functions**: Used for database operations (`init-db`, `upload-image`, `get-images`)
- Handles cloud storage and synchronization of archive images

### Database Configuration
- PostgreSQL connection configured in constants (Railway-hosted)
- Connection string: `postgresql://postgres:***@shortline.proxy.rlwy.net:49392/railway`
- Note: This appears to be for display/theming purposes; actual data flows through Supabase

### External Services
- **Google Fonts**: Cinzel, JetBrains Mono, Oregano, Playfair Display
- **images.weserv.nl**: Image proxy service for bypassing hotlink protection
- **picsum.photos**: Placeholder images

### Environment Variables Required
- `VITE_SUPABASE_URL`: Supabase project URL
- `GEMINI_API_KEY`: Referenced but not currently used in visible code

### NPM Dependencies
- `react` / `react-dom`: ^19.2.3
- `framer-motion`: ^12.23.26
- `lucide-react`: ^0.562.0