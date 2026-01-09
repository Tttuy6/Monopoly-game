# Monopoly AI Game

## Overview

A browser-based Monopoly game featuring one human player and two AI opponents. The application uses a React frontend with a retro board game aesthetic (dark green felt, classic property cards) and an Express backend for game state persistence. The game logic runs primarily on the client side with save/load functionality through the server.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, bundled via Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React useReducer for complex game state, React Query for server communication
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth piece movement and UI transitions
- **Board Layout**: CSS Grid (11x11) for the classic Monopoly board structure

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod validation
- **Build**: esbuild for server bundling, Vite for client bundling
- **Development**: Hot module replacement via Vite middleware in development mode

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema**: Single `games` table storing complete game state as JSONB
- **Migrations**: Drizzle Kit for schema management (`npm run db:push`)

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database schema and TypeScript types for game entities (Player, PropertyState, GameState, TileData)
- `routes.ts`: API route definitions with Zod schemas for type-safe requests/responses

### Game Logic Structure
- Game state managed via reducer pattern in `client/src/pages/Game.tsx`
- Board data (40 tiles with UK property names) defined in `client/src/lib/game-data.ts`
- Actions: ROLL_DICE, MOVE_PLAYER, BUY_PROPERTY, PAY_RENT, NEXT_TURN
- AI players make automatic decisions after delays

## External Dependencies

### Database
- **PostgreSQL**: Required, connection via DATABASE_URL environment variable
- **Drizzle ORM**: Database queries and schema definition
- **connect-pg-simple**: Session storage (available but may not be in use)

### UI Components
- **shadcn/ui**: Full component library including Dialog, Button, Card, Toast
- **Radix UI Primitives**: Underlying accessible component primitives
- **Lucide React**: Icon library

### Animation & Styling
- **Framer Motion**: Smooth animations for game pieces
- **Tailwind CSS**: Utility-first styling with custom theme (green felt background, gold accents)
- **class-variance-authority**: Component variant management

### Data Fetching
- **TanStack React Query**: Server state management and caching
- **Zod**: Runtime validation for API requests/responses