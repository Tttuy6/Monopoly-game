# Monopoly Board Game Simulator

An interactive Monopoly board game simulator built with a React frontend and Express backend. Play classic Monopoly in your browser with full game mechanics including property management, trading, and financial transactions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Development](#development)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Game Rules](#game-rules)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

This Monopoly simulator brings the classic board game to life with a modern web interface. Players can compete in matches, manage properties, negotiate trades, and experience the strategic gameplay of traditional Monopoly—all from their web browser.

## Features

- **Interactive Board Game UI**: Real-time visualization of the game board with player positions
- **Player Management**: Support for 2-4 players with customizable names and colors
- **Property System**: Buy, sell, and trade properties with dynamic pricing
- **Financial Tracking**: Real-time balance updates and transaction history
- **Dice Rolling**: Authentic dice mechanics with doubles handling
- **Card System**: Chance and Community Chest cards with random events
- **AI Players**: Optional computer-controlled opponents with strategic decision-making
- **Game Persistence**: Save and resume games across sessions
- **Responsive Design**: Mobile-friendly interface compatible with various devices

## Technology Stack

### Frontend
- **React 18+**: UI library for building interactive components
- **React Router**: Client-side routing and navigation
- **Axios**: HTTP client for API communication
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Socket.io Client**: Real-time communication with backend

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **Socket.io**: WebSocket library for real-time updates
- **MongoDB/PostgreSQL**: Database (choose based on your setup)
- **JWT**: JSON Web Tokens for authentication
- **Dotenv**: Environment variable management

### Development Tools
- **Webpack**: Module bundler
- **Babel**: JavaScript transpiler
- **ESLint**: Code quality tool
- **Jest**: Testing framework
- **Nodemon**: Development server auto-reload

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 16.x or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version` and `npm --version`

- **npm**: Version 8.x or higher (included with Node.js)

- **Git**: For version control
  - Download from [git-scm.com](https://git-scm.com/)

- **Database**: 
  - MongoDB (local or Atlas cloud instance) OR PostgreSQL
  - Database connection string for configuration

- **Code Editor**: VS Code, WebStorm, or your preferred editor

- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Tttuy6/Monopoly-game.git
cd Monopoly-game
```

### Step 2: Install Backend Dependencies

Navigate to the backend directory and install required packages:

```bash
cd backend
npm install
```

This will install all dependencies listed in `backend/package.json`, including Express, Socket.io, database drivers, and development tools.

### Step 3: Install Frontend Dependencies

Navigate to the frontend directory and install required packages:

```bash
cd ../frontend
npm install
```

This will install all dependencies listed in `frontend/package.json`, including React, React Router, Axios, and Tailwind CSS.

### Step 4: Verify Installation

Verify that all dependencies are properly installed:

```bash
# From the frontend directory
npm list

# From the backend directory
cd ../backend
npm list
```

## Configuration

### Backend Configuration

1. **Create Environment File**

   Navigate to the backend directory and create a `.env` file:

   ```bash
   cd backend
   touch .env
   ```

2. **Configure Environment Variables**

   Add the following variables to `.env`:

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/monopoly-game
   # OR for PostgreSQL:
   # DATABASE_URL=postgresql://user:password@localhost:5432/monopoly_game
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_key_here_change_this_in_production
   JWT_EXPIRATION=7d
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   
   # Socket.io Configuration
   SOCKET_IO_CORS_ORIGIN=http://localhost:3000
   
   # Game Configuration
   STARTING_BALANCE=1500
   MAX_PLAYERS=4
   MIN_PLAYERS=2
   ```

3. **Database Setup**

   **For MongoDB:**
   - Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get your connection string and add it to `DATABASE_URL`
   - Collections will be created automatically on first run

   **For PostgreSQL:**
   - Ensure PostgreSQL is running
   - Create a database: `createdb monopoly_game`
   - Update `DATABASE_URL` in `.env`
   - Run migrations: `npm run migrate`

### Frontend Configuration

1. **Create Environment File**

   Navigate to the frontend directory and create a `.env` file:

   ```bash
   cd frontend
   touch .env.local
   ```

2. **Configure Environment Variables**

   Add the following variables to `.env.local`:

   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_API_TIMEOUT=10000
   
   # Socket.io Configuration
   REACT_APP_SOCKET_URL=http://localhost:5000
   
   # Application Configuration
   REACT_APP_GAME_NAME=Monopoly Simulator
   REACT_APP_MAX_PLAYERS=4
   REACT_APP_MIN_PLAYERS=2
   ```

## Running the Application

### Development Mode

The application consists of two servers that need to run simultaneously.

#### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
Server is running on port 5000
Database connected successfully
Socket.io server initialized
```

#### Terminal 2: Start Frontend Development Server

```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view the app in the browser.
Local:   http://localhost:3000
```

Open your browser and navigate to `http://localhost:3000` to access the game.

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build` directory.

#### Start Backend (Production)

```bash
cd backend
NODE_ENV=production npm start
```

The backend will serve the frontend's static files and API requests on port 5000.

## Development

### Available Scripts

**Backend Scripts:**

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format

# Generate database migrations
npm run migrate
```

**Frontend Scripts:**

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format

# Eject configuration (not recommended)
npm run eject
```

### Code Style

This project follows:
- **ESLint Configuration**: Airbnb style guide
- **Prettier**: Automatic code formatting
- **Husky**: Git hooks for pre-commit linting

To format all files:

```bash
npm run format
```

## Project Structure

```
Monopoly-game/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.jsx
│   │   │   ├── Player.jsx
│   │   │   ├── PropertyCard.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── GameBoard.jsx
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── socket.js
│   │   │   └── gameService.js
│   │   ├── context/
│   │   │   └── GameContext.jsx
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── .env.local
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── gameController.js
│   │   │   ├── playerController.js
│   │   │   └── ...
│   │   ├── models/
│   │   │   ├── Game.js
│   │   │   ├── Player.js
│   │   │   ├── Property.js
│   │   │   └── ...
│   │   ├── routes/
│   │   │   ├── games.js
│   │   │   ├── players.js
│   │   │   └── ...
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── ...
│   │   ├── socket/
│   │   │   └── handlers.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── constants.js
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   ├── game.test.js
│   │   └── ...
│   ├── package.json
│   └── .env
├── README.md
├── .gitignore
└── LICENSE
```

## API Documentation

### Authentication

**POST /api/auth/register**
```json
{
  "username": "player1",
  "email": "player@example.com",
  "password": "securepassword"
}
```

**POST /api/auth/login**
```json
{
  "email": "player@example.com",
  "password": "securepassword"
}
```

### Game Management

**GET /api/games** - Retrieve all games

**POST /api/games** - Create a new game
```json
{
  "name": "My Game",
  "playerCount": 3
}
```

**GET /api/games/:id** - Get specific game details

**POST /api/games/:id/start** - Start a game

**POST /api/games/:id/move** - Execute player move with dice roll

**POST /api/games/:id/buy-property** - Purchase a property

**POST /api/games/:id/trade** - Propose or accept a trade

### Real-time Events (Socket.io)

- `game:join` - Player joins a game
- `game:start` - Game starts
- `game:move` - Player moves
- `game:property:buy` - Property purchased
- `game:trade:propose` - Trade proposed
- `game:update` - Game state updated
- `game:end` - Game ends

## Game Rules

### Basic Gameplay

1. **Turn Order**: Players take turns in clockwise order
2. **Movement**: Roll two dice and move accordingly
3. **Doubles**: Rolling doubles allows an extra turn
4. **Landing on Spaces**:
   - **Property**: Option to buy or pay rent
   - **Chance/Community Chest**: Draw a card
   - **Free Parking**: No action
   - **Go to Jail**: Move to jail (or pay bail)
   - **Income Tax/Luxury Tax**: Pay required amount

### Properties & Rent

- **Unowned Property**: Current player can purchase at listed price
- **Owned Property**: Pay rent to owner based on improvements
- **Monopoly**: Owner can build houses and hotels for increased rent
- **Rent Calculation**: Based on property color group and improvements

### Trading

- Players can propose trades for properties or money
- Both players must agree for trade to complete
- Mortgaging properties is allowed in trades

### Victory Conditions

- Last player remaining with money wins
- Game ends when other players are eliminated (bankruptcy)

## Troubleshooting

### Backend Issues

**Port 5000 Already in Use**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
# or specify different port
PORT=5001 npm run dev
```

**Database Connection Error**
- Verify `DATABASE_URL` in `.env`
- Ensure database service is running
- Check network connectivity for cloud databases
- Verify credentials and permissions

**Module Not Found Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

**Port 3000 Already in Use**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
# or let React prompt to use different port
```

**Blank Page or Errors in Console**
- Clear browser cache: `Ctrl+Shift+Delete`
- Verify backend is running on port 5000
- Check browser console for specific errors
- Ensure all environment variables are set in `.env.local`

**API Connection Issues**
- Verify `REACT_APP_API_URL` matches backend URL
- Check CORS settings in backend `.env`
- Ensure backend is responding: `curl http://localhost:5000/api/health`

### Common Solutions

```bash
# Clear all caches and reinstall
rm -rf frontend/node_modules backend/node_modules
rm frontend/package-lock.json backend/package-lock.json
npm install --prefix frontend
npm install --prefix backend

# Verify Node version
node --version  # Should be 16.x or higher

# Check if ports are accessible
netstat -an | grep 3000
netstat -an | grep 5000
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

Please ensure all tests pass and code is properly formatted before submitting.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Questions or Issues?**

- Open an [issue](https://github.com/Tttuy6/Monopoly-game/issues) on GitHub
- Check existing documentation in the `/docs` folder
- Review the [API documentation](./docs/API.md) for detailed endpoint information

**Last Updated**: January 9, 2026
