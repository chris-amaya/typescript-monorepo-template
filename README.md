# TypeScript Monorepo Template

A production-ready TypeScript monorepo template with Clean Architecture, modern tooling, and best practices.

## 🚀 Quick Start

```bash
# 1. Use this template (click "Use this template" on GitHub)
# 2. Clone your new repo
git clone https://github.com/yourusername/your-project-name.git
cd your-project-name

# 3. Set up the project
npm run setup my-project "My awesome project description"

# 4. Start developing
pnpm dev
```

## 📦 What's Included

### 🏗️ **Monorepo Structure**
- **pnpm workspaces** for efficient dependency management
- **Turborepo** for fast, cached builds  
- **TypeScript** with strict mode and project references
- **Clean Architecture** principles in `packages/core`

### 🎯 **Applications**
- **Next.js 15** web app with React 19
- **Express API** server with TypeScript
- Ready for additional services

### 📚 **Shared Packages**
- **@yourproject/core** - Business logic with Clean Architecture
- **@yourproject/database** - Prisma ORM setup
- **@yourproject/shared** - Common utilities and logger

### 🛠️ **Developer Experience**
- **ESLint + Prettier** for code quality
- **Vitest** for fast testing
- **Hot reload** in development
- **Path aliases** for clean imports

### 🔧 **Production Ready**
- **Docker** support with multi-stage builds
- **GitHub Actions** CI/CD pipeline
- **Environment validation**
- **Security headers** and best practices

## 📁 Project Structure

```
├── apps/
│   ├── web/              # Next.js frontend
│   └── api-server/       # Express API server
├── packages/
│   ├── core/            # Business logic (Clean Architecture)
│   ├── database/        # Prisma ORM
│   └── shared/          # Shared utilities
├── scripts/
└── .github/workflows/   # CI/CD
```

## 🏛️ Clean Architecture

The `packages/core` follows Clean Architecture principles:

```
packages/core/src/
├── application/         # Use cases and business logic
├── domain/             # Entities and business rules  
├── infrastructure/     # External services & adapters
├── ports/              # Interface definitions
├── presentation/       # Controllers and handlers
├── types/              # Shared types
└── validation/         # Schema validation
```

## 🚀 Development Commands

```bash
# Install dependencies
pnpm install

# Start all services
pnpm dev

# Build everything
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Type check
pnpm typecheck

# Format code
pnpm format
```

## 🌐 Environment Setup

1. **Copy environment files:**
   ```bash
   cp apps/web/.env.example apps/web/.env
   cp apps/api-server/.env.example apps/api-server/.env
   ```

2. **Configure your database:**
   ```bash
   # Update DATABASE_URL in .env files
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   ```

3. **Set up the database:**
   ```bash
   pnpm --filter @yourproject/database db:push
   ```

## 🐳 Docker Development

```bash
# Start all services with Docker
docker-compose up -d

# Development with hot reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## 📊 Key Features

### ✅ **Modern Stack**
- TypeScript 5+ with strict mode
- Next.js 15 with React 19
- Tailwind CSS v4
- Prisma ORM
- Vitest for testing

### ✅ **Monorepo Benefits**
- Shared code between applications
- Consistent tooling and configuration
- Efficient dependency management
- Atomic commits across packages

### ✅ **Developer Productivity**
- Path aliases for clean imports
- Hot reload across all services
- Comprehensive linting and formatting
- Type safety across the stack

### ✅ **Production Ready**
- Docker containerization
- CI/CD with GitHub Actions
- Security best practices
- Environment validation

## 🔧 Customization

### Adding New Apps
```bash
# Create new app directory
mkdir apps/my-new-app
cd apps/my-new-app

# Add package.json with workspace reference
# Add to root tsconfig.json references
```

### Adding New Packages
```bash
# Create new package
mkdir packages/my-package
cd packages/my-package

# Add package.json with workspace dependencies
# Export from packages/core/src/index.ts if needed
```

## 📝 Scripts Overview

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all services in development |
| `pnpm build` | Build all packages |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all code |
| `pnpm format` | Format all code |
| `pnpm setup` | Initialize new project |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Happy coding!** 🎉

Made with ❤️ for the TypeScript community.