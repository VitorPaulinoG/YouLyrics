# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YouLyrics is a social platform for literary/poetic works ("textual productions"). Users authenticate via Keycloak (OAuth2/OIDC with Google login support) and can publish and browse poems, lyrics, and other textual content.

## Repository Structure

```
youlyrics/
├── youlyrics-api/         # Spring Boot 3.5 + Java 21 REST API
├── youlyrics-ui/        # React 19 + TypeScript + Vite SPA
├── docker-compose.yml
├── realm-export.json  # Keycloak realm config (auto-imported on container start)
└── .env             # Copy from .env.example and fill in values
```

## Infrastructure

The full stack runs via Docker Compose:
- **youlyrics-db** — PostgreSQL 15 (app database)
- **keycloak-db** — PostgreSQL 15 (Keycloak database)
- **youlyrics-keycloak** — Keycloak 26.1 identity provider; imports `realm-export.json` on start
- **youlyrics-backend** — Spring Boot app; waits for `youlyrics-db` to be healthy

```bash
# Start all services
docker compose up

# Start only infra (DB + Keycloak), run backend locally
docker compose up youlyrics-db keycloak-db youlyrics-keycloak
```

Env vars are loaded from `.env` at the project root. Copy `.env.example` to `.env` and fill in all values before running anything.

## Backend

**Stack:** Spring Boot 3.5, Java 21, Spring Data JPA, Spring Security (OAuth2 Resource Server), MapStruct, Lombok, SpringDoc/OpenAPI.

```bash
cd youlyrics-api

# Run
./mvnw spring-boot:run

# Run all tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=TextualProductionControllerTest

# Build JAR
./mvnw package
```

**Tests** use an in-memory H2 database (`src/test/resources/application.properties`) — no running Postgres or Keycloak needed.

**API docs** (Swagger UI) are available at `http://localhost:8080/swagger-ui.html` when the backend is running.

### Key architectural points

- **`KeycloakJwtAuthenticationConverter`** — converts a Keycloak JWT into an `OAuth2LoggedUser` principal. On first login it auto-provisions a local `User` row by calling `UserService.create(claims)`.
- **`OAuth2LoggedUser`** — the `@AuthenticationPrincipal` type injected into controllers; wraps the JWT claims and the local `User` entity.
- **`SecurityConfig`** — deny-by-default; `GET /api/v1/textual-productions` and Swagger endpoints are public; all others require a valid JWT. The JWT issuer is validated against the *external* Keycloak URL (configurable via `keycloak-external-url` property) to support Docker-internal vs. browser-facing issuer differences.
- **`TextualProduction.content`** — stored as `jsonb` (PostgreSQL) with type `List<List<String>>`, representing structured stanzas/lines.

## Frontend

**Stack:** React 19, TypeScript, Vite 7, React Router 7, TanStack Query 5, Zustand 5, Axios, Tailwind CSS 4, SCSS.

```bash
cd youlyrics-ui

# Dev server (http://localhost:5173)
npm run dev

# Run tests (single pass)
npm test

# Run tests in watch mode
npm run test:watch

# Type-check + production build
npm run build
```

Frontend env vars use the `VITE_` prefix and are configured in the root `.env` file (Vite reads them via `import.meta.env`).

### Key architectural points

- **`AuthProvider` / `useAuth`** — wraps Keycloak JS. Handles init, token refresh (`onTokenExpired`), profile loading, and exposes `login(redirectPath?)` / `logout()`. Must wrap the entire app.
- **`http` (axios instance)** — attaches a fresh Bearer token to every request via a request interceptor (`ensureFreshToken`).
- **Feature-based structure** — code is organized under `src/features/<feature>/` (pages, components, API services) with shared primitives in `src/shared/` and domain models in `src/entities/`.
- **Frontend tests** use Vitest + Testing Library. API/service hooks are mocked with `vi.mock(...)` at the feature level.
