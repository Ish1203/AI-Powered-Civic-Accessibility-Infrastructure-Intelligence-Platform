from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.civic_issue import CivicIssue


router = APIRouter()


@router.post("/{issue_id}")
def resolve_issue(
    issue_id: int,
    evidence_url: str | None = None,
    db: Session = Depends(get_db),
):

    issue = (
        db.query(CivicIssue)
        .filter(
            CivicIssue.id == issue_id
        )
        .first()
    )

    if not issue:

        raise HTTPException(
            status_code=404,
            detail="Issue not found",
        )

    issue.status = "RESOLVED"

    db.commit()
    db.refresh(issue)

    return {
        "message": "Issue resolved",
        "issue": issue,
        "evidence_url": evidence_url,
    }