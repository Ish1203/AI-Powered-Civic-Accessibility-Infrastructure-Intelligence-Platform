# AccessPath AI — Enhanced Frontend

Production-oriented React + TypeScript frontend for the AccessPath AI civic intelligence platform.

## Stack
React 18 · TypeScript · Vite · Tailwind CSS · React Router · TanStack Query · Axios · Leaflet · Recharts · Lucide

## Run
npm install
npm run dev

Set `VITE_API_URL` in `.env` to your FastAPI backend, for example:
VITE_API_URL=http://localhost:8000/api

The UI has explicit demo fallback data where backend endpoints are unavailable. Demo data is labeled in the interface and should not be mistaken for real AI inference.

## Main workflows
- Public landing page
- Citizen dashboard
- Photo-based issue reporting
- AI analysis result
- Complaint editing
- Civic map + filters
- My reports
- Report detail/status timeline
- Notifications/profile
- Authority operations dashboard
- Authority issue queue/detail/assignments/resolution/analytics
- Admin workspaces
