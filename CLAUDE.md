# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript monorepo template built with pnpm workspaces and Turborepo. It implements Clean Architecture principles in the core package and provides a production-ready foundation for full-stack applications.

## Architecture

The project follows a monorepo structure with Clean Architecture:

- **Apps**: Next.js web frontend and Express API server
- **Packages**: Shared business logic (core), database layer (Prisma), and utilities (shared)
- **Core Package**: Implements Clean Architecture with proper separation of concerns across application, domain, infrastructure, and presentation layers

The `packages/core` uses Clean Architecture with directories for:
- `application/` - Use cases and business services
- `domain/` - Entities and repository interfaces  
- `infrastructure/` - Database adapters and external services
- `presentation/` - Controllers and request handlers
- `ports/` - Interface definitions
- `validation/` - Schema validation

## Development Commands

### Primary Commands (run from root)
- `pnpm dev` - Start all services (web + API) with hot reload
- `pnpm build` - Build all packages using Turborepo
- `pnpm test` - Run tests across all packages
- `pnpm lint` - Lint all packages
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm typecheck` - Type check all packages
- `pnpm format` - Format code with Prettier

### Git Hooks (Husky)
- **Pre-commit**: Runs lint-staged to lint and format staged files
- **Commit-msg**: Validates commit messages using conventional commits format
- Supported commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

### Package-Specific Commands
- Web app: `pnpm --filter @{{projectName}}/web [command]`
- API server: `pnpm --filter @{{projectName}}/api-server [command]`
- Database: `pnpm --filter @{{projectName}}/database db:push|db:generate|db:migrate`

### Testing
- `pnpm test:ui` - Run web tests with Vitest UI
- Individual package tests: `pnpm --filter [package-name] test:watch`

## Package Dependencies

Apps depend on workspace packages:
- Both web and api-server use `@{{projectName}}/core` and `@{{projectName}}/database`
- API server also uses `@{{projectName}}/shared` for logging

## Key Technologies

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, Radix UI, TanStack Query
- **Backend**: Express, TypeScript, Prisma ORM
- **Testing**: Vitest with React Testing Library
- **Build**: Turborepo for caching and parallel builds
- **Package Manager**: pnpm with workspaces
- **Git Hooks**: Husky with lint-staged and commitlint

## Development Setup

1. Use project setup script: `npm run setup project-name "description"`
2. Start development: `pnpm dev`
3. Database setup: `pnpm --filter @{{projectName}}/database db:push`

## Docker Support

- `docker-compose up -d` - Production containers
- `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up` - Development with hot reload