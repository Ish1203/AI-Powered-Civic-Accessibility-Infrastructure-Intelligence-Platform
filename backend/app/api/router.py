from fastapi import APIRouter

from app.api import (
    auth,
    reports,
    issues,
    map,
    analytics,
    notifications,
    assignments,
    resolution,
    verification,
)


api_router = APIRouter()


api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"],
)

api_router.include_router(
    reports.router,
    prefix="/reports",
    tags=["Reports"],
)

api_router.include_router(
    issues.router,
    prefix="/issues",
    tags=["Issues"],
)

api_router.include_router(
    map.router,
    prefix="/map",
    tags=["Map"],
)

api_router.include_router(
    analytics.router,
    prefix="/analytics",
    tags=["Analytics"],
)

api_router.include_router(
    notifications.router,
    prefix="/notifications",
    tags=["Notifications"],
)

api_router.include_router(
    assignments.router,
    prefix="/assignments",
    tags=["Assignments"],
)

api_router.include_router(
    resolution.router,
    prefix="/resolution",
    tags=["Resolution"],
)

api_router.include_router(
    verification.router,
    prefix="/verification",
    tags=["Verification"],
)