# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript/Node.js-based Trading Card Game (TCG) inventory management system with a web interface for managing Magic: The Gathering card collections. The system fetches current market prices from Scryfall API and provides comprehensive collection tracking and analytics.

## Architecture

- **Main Application**: `src/index.ts` - Express.js server with session management and routing
- **Database Layer**: `src/database/database.ts` - SQLite database operations with custom promise wrappers
- **External APIs**: Scryfall API integration via `src/services/scryfall.ts`
- **Authentication**: Session-based auth with bcrypt password hashing in `src/services/auth.ts`
- **Storage**: Local SQLite database for persistent card collection data

## Key Components

- **Database Operations**: `src/database/database.ts:6` - Main Database class with card CRUD operations
- **Card Routes**: `src/routes/cards.ts:9` - Express routes for card management, CSV import, and filtering
- **Scryfall Integration**: `src/services/scryfall.ts:5` - Card data fetching and price updates
- **CSV Import**: `src/services/csvImport.ts` - Automatic column mapping and bulk import processing
- **Authentication Routes**: `src/routes/auth.ts` - User registration, login, and session management

## Development Commands

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Access web interface
# http://localhost:5001
```

## Web Application Features

- **Express.js Web Interface**: Complete responsive web app built with EJS templates
- **SQLite Database**: Local storage with comprehensive card details, pricing, and user management
- **Scryfall API Integration**: Automatic card data fetching with image URLs, pricing, and metadata
- **CSV Import System**: Upload Manabox exports with intelligent column mapping
- **User Authentication**: Secure login system with password hashing and sessions
- **Advanced Filtering**: Search by name, rarity, color, mana value, card type with pagination
- **Collection Analytics**: Real-time statistics showing total value, card count, and average prices

## Type Safety

- **TypeScript Interfaces**: Comprehensive types in `src/types/index.ts` for Card, User, and API responses
- **Strict Configuration**: `tsconfig.json` with strict type checking enabled
- **Express Extensions**: Custom session and flash message type extensions

## Legacy Code

The `legacy/` directory contains the original Python Flask implementation that has been fully converted to TypeScript. These files are preserved for reference but are no longer used by the active application.