# Fleet Backend (NestJS)

## Requirements
- Node.js 20+
- PostgreSQL

## Environment
Create a `.env` file in `fleet-backend` with:
```
PORT=3001
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=fleet
JWT_ACCESS_SECRET=replace_me_access
JWT_REFRESH_SECRET=replace_me_refresh
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

## Install & Run
```
npm install
npm run build
npm run start
```

## Roles
Default roles per tenant are auto-created on first user creation:
- `super_admin`
- `fleet_manager`
- `driver`

You can still manage roles via `POST /api/roles` (SUPER_ADMIN token required).
