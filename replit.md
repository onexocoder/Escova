# PetBrush™ 3-in-1 Sales Landing Page

## Overview

This is a Portuguese-language e-commerce sales landing page for PetBrush™, a 3-in-1 multifunctional pet grooming brush. The application is built as a single-page marketing site with an order form that supports "Pague na Entrega" (Cash on Delivery) payment model. The landing page follows modern conversion-focused design patterns inspired by high-converting Shopify and Amazon product pages, emphasizing trust-building elements, product benefits, social proof, and urgency.

The project targets pet owners in Portugal who value convenience, pet hygiene, and animal wellness. The design emphasizes emotional connection through pet imagery, emojis, and customer testimonials while maintaining a clean, professional aesthetic with blue-light and mint green color schemes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18+ with TypeScript
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query (React Query) for server state management
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design system

**Design System:**
- Custom Tailwind configuration with extended color palette supporting light/dark modes
- CSS variables for theme customization (`--background`, `--primary`, `--accent`, etc.)
- Component-based architecture using Shadcn's "New York" style variant
- Responsive-first approach with mobile breakpoint at 768px
- Typography using Poppins font family (weights: 400-800)

**Component Structure:**
- Single-page application with Home component as main landing page
- Form handling using React Hook Form with Zod validation
- UI components from Shadcn/ui library (Button, Card, Badge, Form, Input, Select, Toast, etc.)
- Custom path aliases: `@/` for client src, `@shared/` for shared code, `@assets/` for images

**Key Features:**
- Order form with client-side validation (name, phone, address, postal code, quantity)
- Success state management for order confirmation
- Toast notifications for user feedback
- Stock counter display (hardcoded but could be dynamic)
- Responsive image grid for product demonstrations and testimonials

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js
- TypeScript with ES modules
- Drizzle ORM for database operations
- Neon Database (PostgreSQL) as database provider
- In-memory storage fallback (MemStorage class)

**API Design:**
- RESTful API with `/api/orders` endpoints
- POST `/api/orders` - Create new order with validation
- GET `/api/orders` - Retrieve all orders (admin functionality)
- JSON request/response format
- Zod schema validation for incoming data
- Error handling with appropriate HTTP status codes

**Data Layer:**
- Storage abstraction via `IStorage` interface
- Current implementation: `MemStorage` (in-memory Map storage)
- Schema-driven database design using Drizzle ORM
- UUID generation for order IDs using `crypto.randomUUID()`

**Server Configuration:**
- Development mode with tsx for TypeScript execution
- Production build using esbuild for server bundling
- Request logging middleware with duration tracking
- JSON body parsing with raw body preservation (for potential webhook integrations)
- CORS and credentials handling for API requests

### Data Storage Solutions

**Database Schema:**

**Users Table:**
- `id`: varchar (primary key, UUID)
- `username`: text (unique, not null)
- `password`: text (not null)

**Orders Table:**
- `id`: varchar (primary key, UUID)
- `name`: text (not null, min 2 characters)
- `phone`: text (not null, min 9 characters)
- `address`: text (not null, min 10 characters)
- `postalCode`: text (not null, Portuguese format: ####-###)
- `quantity`: integer (not null, range: 1-10)

**Database Configuration:**
- PostgreSQL dialect via Drizzle Kit
- Connection via `DATABASE_URL` environment variable
- Migrations stored in `./migrations` directory
- Schema definitions in `shared/schema.ts` for code sharing between client and server

**Validation Strategy:**
- Zod schemas generated from Drizzle tables using `createInsertSchema`
- Client-side validation via React Hook Form + Zod resolver
- Server-side validation with `zod-validation-error` for user-friendly messages
- Type safety across full stack using shared TypeScript types

### Authentication and Authorization

**Current State:**
- User schema exists but authentication is not implemented
- No protected routes or session management
- Anonymous order submission (no user login required)

**Prepared Infrastructure:**
- User table with username/password fields ready for future auth implementation
- Session management package installed (`connect-pg-simple`) but not configured
- Express session infrastructure not currently active

### External Dependencies

**Third-Party UI Libraries:**
- Radix UI primitives (27+ component packages for accessible UI patterns)
- Embla Carousel for potential image carousels
- cmdk for command menu patterns
- Lucide React for icons
- class-variance-authority and clsx for conditional styling

**Backend Services:**
- Neon Database (@neondatabase/serverless) for PostgreSQL hosting
- Drizzle ORM (drizzle-orm ^0.39.1) for type-safe database queries
- Drizzle Kit for schema migrations and management

**Development Tools:**
- Replit-specific plugins for development experience:
  - `@replit/vite-plugin-runtime-error-modal`
  - `@replit/vite-plugin-cartographer`
  - `@replit/vite-plugin-dev-banner`
- esbuild for production server bundling
- tsx for TypeScript execution in development

**Build & Deployment:**
- Vite for frontend bundling and optimization
- PostCSS with Tailwind CSS and Autoprefixer
- Static file serving via Express in production
- Environment variable: `NODE_ENV` for environment detection

**Asset Management:**
- Generated product images stored in `attached_assets/generated_images/`
- Images for hero section, demonstrations (cat/dog), and testimonials
- Vite path alias `@assets` for asset imports

**Form & Validation:**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for integration between the two
- date-fns for date manipulation (installed but not actively used)