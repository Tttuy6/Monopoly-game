# Monopoly Game

A browser-based Monopoly game featuring one human player and two AI opponents, built with React, TypeScript, Express, and PostgreSQL.

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database running locally or remotely
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tttuy6/Monopoly-game.git
cd Monopoly-game
```

2. Install dependencies:
```bash
cd Monopoly-Game
npm install
```

3. Set up environment variables:
Create a `.env` file in the Monopoly-Game directory:
```
DATABASE_URL=postgresql://user:password@localhost:5432/monopoly_game
NODE_ENV=development
```

4. Push database schema:
```bash
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3000` (or another port) with hot module replacement.

### Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS with shadcn/ui components
- Framer Motion for animations
- TanStack React Query for data fetching
- Wouter for client-side routing

### Backend
- Express.js with TypeScript
- PostgreSQL with Drizzle ORM
- Express sessions for authentication
- Passport.js for local authentication
- WebSockets for real-time updates

### Database
- PostgreSQL
- Drizzle Kit for migrations

## Project Structure

```
Monopoly-Game/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # Game pages
│   │   ├── components/  # React components
│   │   └── lib/         # Utilities and game logic
│   └── public/          # Static assets
├── server/              # Express backend
│   └── index.ts         # Entry point
├── shared/              # Shared types and routes
│   ├── schema.ts        # Database schema
│   └── routes.ts        # API routes
├── script/              # Build scripts
└── attached_assets/     # Game assets
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Apply database migrations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Game Features

- Single-player campaign against 2 AI opponents
- Classic Monopoly rules implementation
- UK property board with authentic names
- Real-time game state synchronization
- Persistent game saves via PostgreSQL
- Responsive web interface
- Smooth animations and transitions