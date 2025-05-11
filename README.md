### Movie Rating App

> Live preview: [https://movie-rating-app-bice.vercel.app](https://movie-rating-app-bice.vercel.app)

> [简体中文](./README.zh-CN.md)

## Feature Overview

- User authentication (login/logout)
- Movie browsing and detail display
- Movie rating system
- User review functionality
- Movie search
- Dark/Light theme switching
- Responsive design
- Internationalization

## Project Architecture

```plaintext
movie-rating/
├── config/                # Configuration files
│   └── data/              # Initialization data
├── src/
│   ├── app/               # Next.js App Router structure
│   │   ├── page.tsx       # Home page
│   │   ├── layout.tsx     # Root layout
│   │   ├── globals.css    # Global styles
│   │   └── movie/         # Movie-related routes
│   │       └── [id]/      # Movie detail page (dynamic route)
│   ├── components/        # Reusable components
│   │   ├── header/        # Page header components
│   │   ├── ui/            # Chakra UI components
│   │   └── login-dialog/  # Login dialog component
│   ├── constants/         # Constant definitions
│   ├── database/          # Database interaction layer
│   ├── server-actions/    # Next.js Server Actions
│   └── utils/             # Utility functions
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## Tech Stack

### Core Framework

- **Next.js 15**
- **React 19**

### UI & Styling

- **Chakra UI 3**
- **Tailwind CSS 4**

### Backend Interaction

- **Server Actions** - Using Next.js Server Actions for server-side interactions

### Data Validation

- **Zod**

### Testing Tools

- **Vitest** - High-performance testing framework, faster than Jest
- **Happy DOM** - DOM environment for testing
- **Testing Library** - User interaction testing tools

  - `@testing-library/dom`
  - `@testing-library/react`
  - `@testing-library/user-event`

### Data Storage

- **Redis** - Used to simulate a database
- **IORedis** - Redis client

### Development Tools

- **Husky** - Git hooks management
- **Prettier** - Code formatting
- **ESLint** - Code quality checking
- **lint-staged** - Run linters against staged files

## Quick Start

### Requirements

- **Node.js v22** (see `.nvmrc`)
- **pnpm v9** (see `package.json#packageManager`)
- **Redis** service (can be run through Docker)

### Install Dependencies

```shellscript
pnpm install
```

### Data Initialization

#### Option 1: Local Redis (recommended for development)

Start Redis service using Docker:

```shellscript
docker run --name movie-rating-redis -p 6379:6379 -d redis
```

Initialize data:

```shellscript
pnpm run init:data
```

#### Option 2: Cloud Redis

Add Redis connection URL in the `.env.local` file:

```plaintext
REDIS_URL=redis://...
```

Then run:

```shellscript
pnpm run init:data
```

### Start Development Server

```shellscript
pnpm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application

## Testing

The project uses Vitest for unit testing, with test files located in the same directory as the source code:

- `*.ts` - Source code files
- `*.spec.ts` - Test files

Run tests:

```shellscript
pnpm run test
```

### Current Test Coverage

```plaintext
----------------------------------------|---------|----------|---------|---------|-------------------
File                                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------------------|---------|----------|---------|---------|-------------------
All files                               |   78.45 |     86.6 |   88.23 |   78.45 |
 src                                    |     100 |      100 |     100 |     100 |
  middleware.ts                         |     100 |      100 |     100 |     100 |
 src/app/[locale]                       |       0 |        0 |       0 |       0 |
  page.tsx                              |       0 |        0 |       0 |       0 | 1-26
 src/app/[locale]/components            |     100 |      100 |     100 |     100 |
  movie-grid.tsx                        |     100 |      100 |     100 |     100 |
  search-input.tsx                      |     100 |      100 |     100 |     100 |
 src/app/[locale]/movie/[id]            |   65.35 |     87.5 |      50 |   65.35 |
  page.tsx                              |   65.35 |     87.5 |      50 |   65.35 | 86,108-160
 src/app/[locale]/movie/[id]/components |   91.17 |     37.5 |   66.66 |   91.17 |
  rating-trigger.tsx                    |   91.17 |     37.5 |   66.66 |   91.17 | 28-33,40-42
 src/components                         |   96.29 |    66.66 |     100 |   96.29 |
  login-dialog.tsx                      |   94.25 |    57.14 |     100 |   94.25 | 28-32
  pagination.tsx                        |     100 |      100 |     100 |     100 |
 src/components/header                  |   30.81 |      100 |      75 |   30.81 |
  header-user-info.tsx                  |   84.48 |      100 |   66.66 |   84.48 | 39-47
  index.tsx                             |       0 |      100 |     100 |       0 | 2-124
 src/constants                          |     100 |      100 |     100 |     100 |
  cookie-ids.ts                         |     100 |      100 |     100 |     100 |
  modal-ids.ts                          |     100 |      100 |     100 |     100 |
 src/i18n                               |   59.61 |    81.81 |     100 |   59.61 |
  client-provider.tsx                   |       0 |      100 |     100 |       0 | 2-14
  client.ts                             |       0 |      100 |     100 |       0 | 2-37
  config.ts                             |     100 |      100 |     100 |     100 |
  server.ts                             |   93.87 |       75 |     100 |   93.87 | 51-53
  shared-options.ts                     |     100 |      100 |     100 |     100 |
 src/server-actions                     |     100 |       95 |     100 |     100 |
  check-user-is-rated.ts                |     100 |      100 |     100 |     100 |
  get-user-info.ts                      |     100 |      100 |     100 |     100 |
  login.ts                              |     100 |      100 |     100 |     100 |
  logout.ts                             |     100 |      100 |     100 |     100 |
  movie-detail.ts                       |     100 |      100 |     100 |     100 |
  page-search-movie-comments.ts         |     100 |    77.77 |     100 |     100 | 31,46
  page-search-movies.ts                 |     100 |      100 |     100 |     100 |
  rate-movie.ts                         |     100 |      100 |     100 |     100 |
 src/utils                              |   93.33 |       75 |     100 |   93.33 |
  base-page-search-schema.ts            |     100 |      100 |     100 |     100 |
  response.ts                           |      92 |       75 |     100 |      92 | 29-30
----------------------------------------|---------|----------|---------|---------|-------------------
```

## Development Standards

The project has configured pre-commit checks to ensure code quality:

- Code formatting (Prettier)
- TypeScript type checking
- Unit testing (Vitest)

If any checks fail, the commit will be blocked.
