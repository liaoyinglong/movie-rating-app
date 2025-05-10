### Movie Rating App

> Live preview: [https://movie-rating-app-bice.vercel.app](https://movie-rating-app-bice.vercel.app)

## Feature Overview

- User authentication (login/logout)
- Movie browsing and detail display
- Movie rating system
- User review functionality
- Movie search
- Dark/Light theme switching
- Responsive design

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

## 🚀 Quick Start

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
--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |   80.48 |    87.05 |   89.28 |   80.48 |
 app                            |       0 |      100 |     100 |       0 |
  page.tsx                      |       0 |      100 |     100 |       0 | 3-25
 app/components                 |   76.08 |      100 |     100 |   76.08 |
  movie-grid.tsx                |     100 |      100 |     100 |     100 |
  search-input.tsx              |       0 |      100 |     100 |       0 | 2-26
 app/movie/[id]                 |   63.86 |     87.5 |      50 |   63.86 |
  page.tsx                      |   63.86 |     87.5 |      50 |   63.86 | 81,103-155
 app/movie/[id]/components      |    90.9 |     37.5 |   66.66 |    90.9 |
  rating-trigger.tsx            |    90.9 |     37.5 |   66.66 |    90.9 | 27-32,39-41
 components                     |   96.26 |    66.66 |     100 |   96.26 |
  login-dialog.tsx              |   94.18 |    57.14 |     100 |   94.18 | 26-30
  pagination.tsx                |     100 |      100 |     100 |     100 |
 components/header              |      40 |      100 |      75 |      40 |
  header-user-info.tsx          |   84.21 |      100 |   66.66 |   84.21 | 37-45
  index.tsx                     |       0 |      100 |     100 |       0 | 2-83
 constants                      |     100 |      100 |     100 |     100 |
  cookie-ids.ts                 |     100 |      100 |     100 |     100 |
  modal-ids.ts                  |     100 |      100 |     100 |     100 |
 server-actions                 |     100 |    94.73 |     100 |     100 |
  check-user-is-rated.ts        |     100 |      100 |     100 |     100 |
  get-user-info.ts              |     100 |      100 |     100 |     100 |
  login.ts                      |     100 |      100 |     100 |     100 |
  logout.ts                     |     100 |      100 |     100 |     100 |
  movie-detail.ts               |     100 |      100 |     100 |     100 |
  page-search-movie-comments.ts |     100 |    77.77 |     100 |     100 | 31,46
  page-search-movies.ts         |     100 |      100 |     100 |     100 |
  rate-movie.ts                 |     100 |      100 |     100 |     100 |
 utils                          |     100 |      100 |     100 |     100 |
  base-page-search-schema.ts    |     100 |      100 |     100 |     100 |
  response.ts                   |     100 |      100 |     100 |     100 |
  test-utils.tsx                |     100 |      100 |     100 |     100 |
--------------------------------|---------|----------|---------|---------|-------------------
```

## Development Standards

The project has configured pre-commit checks to ensure code quality:

- Code formatting (Prettier)
- TypeScript type checking
- Unit testing (Vitest)

If any checks fail, the commit will be blocked.
