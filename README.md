# AccessPath AI - Civic Accessibility Intelligence Platform

AccessPath AI is a civic reporting and infrastructure intelligence platform designed to turn everyday public-service issues into actionable, trackable work. Citizens can report problems such as blocked pathways, damaged roads, sanitation issues, or accessibility barriers, while the platform supports AI-assisted triage, classification, routing, and follow-up workflows.

## Project overview

This repository contains:

- Backend: FastAPI application with SQLAlchemy, PostgreSQL, JWT auth, report workflows, routing, anomaly detection, and AI integration points
- Frontend: React + Vite + TypeScript interface for submitting, reviewing, and managing issues
- Database: PostgreSQL via Docker Compose
- ML: model training and inference assets under the ml folder
- Docs: backend and API documentation in the docs folder

### User flow

```text
CITIZEN
   │
   ▼
React Frontend
   │
   Image + GPS Data
   │
   ▼
FastAPI Backend
   │
   ┌─────────────┼──────────────┐
   ▼             ▼              ▼
S3             AI Layer      PostgreSQL
   │             │
   └──────┬──────┴───────┬───────┐
          ▼               ▼       ▼
   AWS Bedrock      Optional YOLO   Issue Detection
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
    Severity             Category             Duplicate Engine
         │                     │                     │
         └─────────┬───────────┴────────────┬──────────┘
                   ▼                         ▼
            Department Routing         Complaint Generator
                   │                         │
                   └──────────────┬──────────┘
                                  ▼
                          Civic Issue Created
                                  │
                                  ▼
                       Authority Dashboard
                                  │
                                  ▼
                               Assigned
                                  │
                                  ▼
                            In Progress
                                  │
                                  ▼
                               Resolved
                                  │
                                  ▼
                    Before/After Evidence
                                  │
                                  ▼
                           AI Verification
                                  │
                                  ▼
                                 CLOSED
```

### Cloud architecture

```text
AWS CLOUD
   │
   ┌───────────────┼────────────────┐
   │               │                │
   ▼               ▼                ▼
S3 Bucket     Amazon Bedrock    RDS PostgreSQL
   │               │                │
   │               ▼                │
   │          AI Analysis           │
   │                               │
   └───────────────┼────────────────┘
                   ▼
          FastAPI Backend
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
   Authority API        Citizen API
         │                   │
         └─────────┬─────────┘
                   ▼
             React Frontend
```

## Tech stack

- Python 3.11+
- FastAPI
- SQLAlchemy 2
- PostgreSQL 16
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Docker Compose

## Repository structure

```text
.
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   │   ├── accessibility/
│   │   │   ├── classification/
│   │   │   ├── detection/
│   │   │   ├── duplicate_detection/
│   │   │   ├── inference/
│   │   │   ├── models/
│   │   │   ├── postprocessing/
│   │   │   └── preprocessing/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   ├── errors.py
│   │   │   └── rate_limit.py
│   │   ├── auth/
│   │   ├── config/
│   │   ├── db/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── main.py
│   │   └── __init__.py
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── test_auth.py
│   │   │   ├── test_reports.py
│   │   │   ├── test_issues.py
│   │   │   ├── test_severity.py
│   │   │   ├── test_duplicate.py
│   │   │   └── test_ai_response.py
│   │   ├── integration/
│   │   │   ├── test_auth.py
│   │   │   ├── test_reports.py
│   │   │   ├── test_issues.py
│   │   │   └── test_verification.py
│   │   └── conftest.py
│   ├── alembic/
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   ├── pytest.ini
│   ├── alembic.ini
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── index.html
│   └── README.md
│
├── ml/
│   ├── README.md
│   ├── datasets/
│   │   ├── raw/
│   │   ├── processed/
│   │   └── README.md
│   ├── training/
│   │   ├── train.py
│   │   ├── evaluate.py
│   │   └── config.yaml
│   ├── models/
│   │   └── README.md
│   └── inference/
│       └── inference.py
│
├── database/
│   ├── schema.sql
│   ├── seed.py
│   └── seed_data.json
│
├── scripts/
│   ├── setup.sh
│   ├── seed_database.sh
│   └── health_check.sh
│
├── docker/
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   └── nginx.conf
│
├── .github/
│   └── workflows/
│       ├── frontend.yml
│       ├── backend.yml
│       └── deploy.yml
│
├── docker-compose.yml
├── .env.example
├── README.md
├── docs/
│   ├── API.md
│   └── BACKEND.md
└── ...
```

## Prerequisites

Before you start, install:

- Python 3.11+
- Node.js 18+
- npm
- Docker Desktop (for PostgreSQL container)
- Git

## Environment configuration

Create a local environment file from the example:

```powershell
copy .env.example .env
```

Then review the variables in [.env.example](.env.example), especially:

- DATABASE_URL
- JWT_SECRET
- CORS_ORIGINS
- SEED_DEMO_PASSWORD

For a production-ready JWT secret, generate one with:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

## Start PostgreSQL

From the project root:

```powershell
docker compose up -d postgres
```

This starts the database defined in [docker-compose.yml](docker-compose.yml).

## Backend setup

Open a PowerShell terminal in the project root and run:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
```

If you want only the runtime dependencies:

```powershell
cd backend
pip install -r requirements.txt
```

Initialize the database for the first run:

```powershell
cd ..
./scripts/init-db.sh
```

Then start the API:

```powershell
cd backend
uvicorn app.main:app --reload --port 8000
```

The API will be available at:

- http://localhost:8000/api/docs
- http://localhost:8000/api/redoc

## Frontend setup

Open a second terminal and run:

```powershell
cd frontend
npm install
npm run dev
```

The frontend will run on:

- http://localhost:5173

## Running tests

Backend tests:

```powershell
cd backend
pytest
```

## Useful commands

### Backend

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

### Frontend

```powershell
cd frontend
npm run dev
```

### Database

```powershell
docker compose up -d postgres
docker compose down
```

## Notes

- The project expects a configured [.env.example](.env.example) file before starting services.
- The seed script creates demo accounts for local development when the environment is not set to production.
- Backend docs are available in [docs/BACKEND.md](docs/BACKEND.md).
- API docs are served directly by FastAPI from the backend.
- Architecture is designed for civic issue intake, AI-assisted prioritization, workflow tracking, and authority resolution.

## System purpose

The platform combines:

- citizen issue reporting,
- AI-driven issue detection and severity scoring,
- duplicate detection,
- routing to the right department,
- complaint generation,
- status tracking from assignment to closure,
- and verification with before/after evidence.

This makes it suitable for public-sector monitoring, field operations, accessibility assessment, and urban infrastructure intelligence.

## License

This project is for internal or educational use unless otherwise specified by the owning organization.
