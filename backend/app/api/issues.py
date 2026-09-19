from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.civic_issue import CivicIssue


router = APIRouter()


@router.get("/")
def get_issues(
    status: str | None = None,
    severity: str | None = None,
    db: Session = Depends(get_db),
):

    query = db.query(CivicIssue)

    if status:
        query = query.filter(
            CivicIssue.status == status
        )

    if severity:
        query = query.filter(
            CivicIssue.severity == severity
        )

    return query.order_by(
        CivicIssue.created_at.desc()
    ).all()


@router.get("/{issue_id}")
def get_issue(
    issue_id: int,
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

    return issue


@router.patch("/{issue_id}/status")
def update_status(
    issue_id: int,
    status: str,
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

    issue.status = status

    db.commit()
    db.refresh(issue)

    return issue