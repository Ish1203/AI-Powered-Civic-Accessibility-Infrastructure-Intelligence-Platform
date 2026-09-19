from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.civic_issue import CivicIssue


router = APIRouter()


@router.get("/issues")
def get_map_issues(
    db: Session = Depends(get_db),
):

    issues = (
        db.query(CivicIssue)
        .filter(
            CivicIssue.latitude.isnot(None),
            CivicIssue.longitude.isnot(None),
        )
        .all()
    )

    return [
        {
            "id": issue.id,
            "title": issue.title,
            "severity": issue.severity,
            "status": issue.status,
            "latitude": issue.latitude,
            "longitude": issue.longitude,
        }
        for issue in issues
    ]