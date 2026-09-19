from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.civic_issue import CivicIssue


router = APIRouter()


@router.get("/summary")
def analytics_summary(
    db: Session = Depends(get_db),
):

    total = (
        db.query(
            func.count(CivicIssue.id)
        ).scalar()
        or 0
    )

    resolved = (
        db.query(
            func.count(CivicIssue.id)
        )
        .filter(
            CivicIssue.status == "RESOLVED"
        )
        .scalar()
        or 0
    )

    pending = total - resolved

    return {
        "total_issues": total,
        "resolved_issues": resolved,
        "pending_issues": pending,
        "resolution_rate": (
            round(
                resolved / total * 100,
                2,
            )
            if total
            else 0
        ),
    }