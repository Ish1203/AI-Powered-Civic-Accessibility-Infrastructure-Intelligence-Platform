from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.civic_issue import CivicIssue
from app.schemas.report import (
    ReportCreate,
    ReportResponse,
)


router = APIRouter()


@router.post(
    "/",
    response_model=ReportResponse,
)
def create_report(
    data: ReportCreate,
    db: Session = Depends(get_db),
):

    issue = CivicIssue(
        title=data.title,
        description=data.description,
        reported_by=data.reported_by,
        latitude=data.latitude,
        longitude=data.longitude,
        image_url=data.image_url,
        severity=data.severity or "MEDIUM",
    )

    db.add(issue)
    db.commit()
    db.refresh(issue)

    return issue


@router.get(
    "/",
    response_model=list[ReportResponse],
)
def get_reports(
    db: Session = Depends(get_db),
):

    return (
        db.query(CivicIssue)
        .order_by(
            CivicIssue.created_at.desc()
        )
        .all()
    )


@router.get(
    "/{report_id}",
    response_model=ReportResponse,
)
def get_report(
    report_id: int,
    db: Session = Depends(get_db),
):

    report = (
        db.query(CivicIssue)
        .filter(
            CivicIssue.id == report_id
        )
        .first()
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return report