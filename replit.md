# Overview

This is a full-stack web application built with React, Express, and PostgreSQL. The project implements a modern tech stack with TypeScript throughout, featuring a tic-tac-toe game as the main functionality. The application uses a monorepo structure with shared code between client and server, and includes a comprehensive UI component library based on shadcn/ui.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Build System**: Vite with hot module replacement and development plugins

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for server bundling

## Data Storage
- **Database**: PostgreSQL with Neon serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **ORM**: Drizzle ORM with type-safe queries and schema validation
- **Validation**: Zod schemas integrated with Drizzle for runtime validation
- **Development Storage**: In-memory storage implementation for development/testing

## Authentication & Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Schema**: Basic user model with username/password authentication
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

## External Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: TanStack Query for API state management
- **Validation**: Zod for schema validation and type safety
- **Development Tools**: Replit integration for development environment
- **Date Handling**: date-fns for date manipulation utilities