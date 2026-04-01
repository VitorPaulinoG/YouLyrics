# YouLyrics Frontend

Frontend migrado de Angular para React com Vite, TypeScript, Tailwind CSS v4 e SCSS.

## Stack

- React 19
- Vite
- React Router
- TanStack Query
- Axios
- Keycloak JS
- Tailwind CSS
- SCSS
- Vitest + Testing Library

## Estrutura

```text
src/
  app/         # bootstrap, providers, router e layout base
  entities/    # modelos de domínio
  features/    # páginas e componentes por capacidade de negócio
  shared/      # config, api, tipos e UI reutilizável
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Aplicação disponível em `http://localhost:5173`.

## Build

```bash
npm run build
```

## Testes

```bash
npm run test
```
