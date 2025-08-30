# Overview

This is a full-stack AI chat application built with React/TypeScript frontend and Express.js backend. The application provides a conversational interface where users can interact with an AI assistant through a clean, modern chat interface. It features Replit-based authentication, real-time messaging, and a responsive design built with shadcn/ui components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessibility and customization
- **Styling**: Tailwind CSS with CSS custom properties for theming support
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with hot module replacement and development optimizations

## Backend Architecture
- **Runtime**: Node.js with TypeScript and ESM modules
- **Framework**: Express.js with middleware for JSON parsing, logging, and error handling
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Authentication**: Replit OAuth integration with OpenID Connect and Passport.js
- **Session Management**: Express sessions with PostgreSQL store using connect-pg-simple
- **Development**: TSX for TypeScript execution in development mode

## Database Design
- **Users Table**: Stores user profiles with email, names, and profile images (required for Replit Auth)
- **Sessions Table**: Handles user session persistence with automatic expiration (required for Replit Auth)
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Connection**: Neon serverless PostgreSQL with WebSocket support for scalability

## Authentication & Security
- **OAuth Provider**: Replit OpenID Connect with automatic user discovery
- **Session Security**: HTTP-only cookies with secure flags and 7-day expiration
- **CSRF Protection**: Built-in session validation and origin checking
- **User Management**: Automatic user creation/update on successful authentication

## API Architecture
- **RESTful Design**: Express routes with proper HTTP status codes and error handling
- **Mock AI Integration**: Placeholder bot functionality ready for AI service integration
- **Request Logging**: Automatic API request/response logging with timing metrics
- **Error Handling**: Centralized error middleware with proper status code mapping

## Development Workflow
- **Monorepo Structure**: Shared types and schemas between client and server
- **Hot Reloading**: Vite development server with automatic browser refresh
- **Type Safety**: End-to-end TypeScript with strict configuration
- **Path Aliases**: Organized imports with @ prefixes for cleaner code organization

# External Dependencies

## Database & Storage
- **Neon Database**: Serverless PostgreSQL with connection pooling and WebSocket support
- **Drizzle ORM**: Type-safe database toolkit with automatic migrations

## Authentication Services
- **Replit Authentication**: OAuth 2.0 / OpenID Connect integration for user management
- **Session Storage**: PostgreSQL-backed session store for persistence

## UI & Styling
- **Radix UI**: Headless component library for accessibility-first UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Modern icon library with consistent design language

## Development Tools
- **Vite**: Next-generation build tool with fast HMR and optimized bundling
- **TanStack Query**: Powerful data fetching and caching library for React
- **Wouter**: Minimalist routing solution for single-page applications