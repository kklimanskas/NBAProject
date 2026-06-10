# NBA Project

A full-stack NBA data application. This repository contains the backend (NestJS) for the NBA Project; frontend details (React + Vite) are included below for reference.

**Overview**
- **Backend:** NestJS + TypeScript server providing player and team APIs, schema validation, and scheduled jobs, Swagger for API documentation.
- **Frontend (summary):** React + Vite app using TypeScript, React Query, Material UI for browsing and managing NBA player data (details included in the Frontend section).

**Features**
- **Player Discovery:** Browse players with pagination and filtering.
- **Player Details:** View detailed player profiles.
- **Search & Filter:** Search players by name, position, and country.
- **Data Management:** Create, update, and delete player records via API.
- **Scheduled Jobs:** Background cron jobs for syncing or loading player data.
- **Resilient Fetching:** Frontend uses retry + exponential backoff policies for robust API calls.

**Tech Stack**
- **Backend:** NestJS, TypeScript, @nestjs/mongoose (Mongoose), @nestjs/schedule (cron jobs), Axios, Swagger
- **Frontend:** React 19, TypeScript, Vite, React Query, Material UI (see Frontend section)

**Backend Project Structure**

- **Controllers:** [src/player/player.controller.ts](src/player/player.controller.ts)
- **Services:** [src/player/player.service.ts](src/player/player.service.ts)
- **Modules:** [src/player/player.module.ts](src/player/player.module.ts)
- **Schemas:** [src/schemas/player.schema.ts](src/schemas/player.schema.ts), [src/schemas/team.schema.ts](src/schemas/team.schema.ts)
- **DTOs:** [src/dto/player.dto.ts](src/dto/player.dto.ts), [src/dto/pagination.dto.ts](src/dto/pagination.dto.ts)
- **Cron jobs:** [src/cronjobs/player.job.ts](src/cronjobs/player.job.ts)
- **Tests:** [test/](test/) contains e2e and unit test configuration and specs

**API Endpoints (server)**
- `GET /player/get` - List players with pagination and filters
- `GET /player/:id` - Get single player details
- `PATCH /player/update/:id` - Update player
- `PATCH /player/delete/:id` - Delete player

(These routes are implemented in `src/player` controllers and services.)

**Getting Started (Backend)**

Prerequisites:
- Node.js 16+
- npm
- MongoDB instance (local or remote) for Mongoose

Install dependencies:

```bash
npm install
```

Environment:
- Create a `.env` in the repo root and set at least the MongoDB connection string and other runtime vars (example keys shown below):

```env
#Database URI
MONGO_URI=
#Balldontlie API details
API_KEY=
BASE_URL=https://api.balldontlie.io/v1
```

Run locally (dev):

```bash
npm run start:dev
```

Production build and run:

```bash
npm run build
npm run start:prod
```

**Scripts**
- **build:** `npm run build` — compile TypeScript/Nest app
- **start:** `npm run start` — start app
- **start:dev:** `npm run start:dev` — watch mode (development)
- **lint:** `npm run lint` — run ESLint
- **test:** `npm run test` — run unit tests
- **test:e2e:** `npm run test:e2e` — e2e tests

(These scripts are defined in `package.json`.)

**Data model & Validation**
- Schemas use Mongoose to define player and team models in `src/schemas`.
- DTOs and class-validator are used for request validation and transformation in `src/dto`.

**Scheduled Jobs**
- Background tasks live in `src/cronjobs` and are wired via `@nestjs/schedule` to run periodic jobs (for example, `player.job.ts`).

**API Documentation (Swagger)**

The backend API is documented using Swagger via the @nestjs/swagger package. Swagger automatically generates interactive API documentation from NestJS controllers and DTOs.

**Access Swagger UI**

After starting the backend server, the API documentation is available at:

```bash
http://localhost:3000/api
```

Swagger is configured in main.ts using SwaggerModule and DocumentBuilder. DTO classes are decorated with @ApiProperty, allowing automatic schema generation and validation visibility in the documentation.

**Frontend (Summary)**

This project pairs with a frontend React app (separate folder).

**Features**
- Player Discovery, Details, Search & Filter, Data Management, Real-time updates with React Query, Retry with cooldown and exponential backoff, Responsive Material UI design.

**Tech Stack**
- React 19, TypeScript, Vite, React Query, Axios, React Router, Material UI, ESLint

**Frontend Project Structure**
```
src/
├── components/
│   ├── Player/
│   │   ├── PlayerCard.tsx
│   │   ├── PlayerDetail.tsx
│   │   └── PlayerDialog.tsx
│   └── Team/
│       └── TeamCard.tsx
├── pages/
│   └── Home.tsx
├── hooks/
│   ├── usePlayer.ts
│   └── usePlayerMutations.ts
├── api/
│   └── playerApi.ts
├── types/
│   └── nba.ts
├── enums/
│   └── index.enum.ts
├── assets/
├── App.tsx
├── main.tsx
└── index.css
```

**Frontend Data Fetching & Behaviour**
- Queries: `usePlayers()` - paginated players, retry 3 attempts, exponential backoff (1s → 2s → 4s, cap 30s), cache 5 minutes
- Mutations: `useUpdatePlayer()`, `useDeletePlayer()` - retry 2 attempts with exponential backoff
- API endpoints used by the frontend are expected at `VITE_API_URL` (see Environment below)

**Frontend environment example**

```env
VITE_API_URL=http://localhost:3000
API_URL=http://localhost:3000
```

**Development Notes**
- Backend uses `@nestjs/mongoose` - ensure MongoDB is reachable before running the app.
- DTOs, validation pipes, and global interceptors are used for consistent request handling.
- Cron jobs require `@nestjs/schedule` and will run when the app starts in environments where scheduling is desired.

**Testing**
- Unit and e2e tests live under `test/` and are run with `npm run test` and `npm run test:e2e`.
