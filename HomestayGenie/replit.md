# Overview

This is AIHotel - a homestay chatbot creation platform that allows users to input details about their homestay properties and generate custom AI chatbots for customer service automation. The application is built as a full-stack web application with React frontend and Express backend, designed to streamline customer interactions for homestay businesses through AI-powered chatbots.

## Recent Updates (January 2025)
- ✅ **Fixed Database Connection**: Switched from WebSocket to HTTP client for better reliability with Neon database
- ✅ **Updated Branding**: Fully rebranded to "AIHotel" with modern, professional design
- ✅ **Enhanced UI/UX**: Implemented gradient backgrounds, improved typography, and modern component styling
- ✅ **Improved Color Scheme**: Professional blue-based palette with custom CSS animations and effects

# User Preferences

Preferred communication style: Simple, everyday language.
Brand Name: AIHotel
Design Style: Modern, professional, AI-focused with blue gradient themes

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with route-based organization
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Request Logging**: Custom middleware for API request/response logging

## Authentication & Authorization
- **Provider**: Replit Auth integration using OpenID Connect (OIDC)
- **Session Management**: Express sessions with PostgreSQL session store
- **Security**: HTTP-only cookies with secure flags, CSRF protection via session secrets
- **User Flow**: OAuth2 flow with automatic user creation/updates on login

## Data Storage
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Design**: Separate tables for users, homestays, and session storage
- **Data Validation**: Zod schemas shared between frontend and backend for consistent validation

## External Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Authentication**: Replit Auth service for user authentication
- **UI Components**: Shadcn/ui component system
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation
- **Development**: Replit-specific plugins for error handling and cartographer integration

## Key Features
- **Multi-language Support**: Vietnamese language interface for homestay management
- **Form Validation**: Comprehensive validation for homestay information including contact details, services, and FAQ sections
- **Session Persistence**: User data temporarily stored in session storage during form completion
- **Responsive Design**: Mobile-first design with Tailwind CSS responsive utilities
- **Type Safety**: End-to-end TypeScript with shared schemas between client and server
- **AIHotel Branding**: Professional branding with blue gradient theme and modern UI components
- **Enhanced UX**: Animated elements, glass morphism effects, and improved visual hierarchy