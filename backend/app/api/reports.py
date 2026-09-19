from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form,
)
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.civic_issue import CivicIssue
from app.schemas.report import ReportResponse

router = APIRouter()


# =========================================================
# AI ANALYSIS
# =========================================================

@router.post("/analyze")
async def analyze_report(
    image: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    address: str | None = Form(None),
    description: str | None = Form(None),
):
    # Temporary response.
    # Later yahan actual Bedrock AI connect karenge.

    return {
        "category": "Accessibility",
        "issueType": "Blocked Footpath",
        "confidence": 0.92,
        "severity": "HIGH",
        "detectedObjects": ["vehicle", "footpath"],
        "accessibilityImpact": (
            "Pedestrian and wheelchair route affected"
        ),
        "safetyRisk": (
            "Potential pedestrian safety risk"
        ),
        "description": (
            description
            or "AI detected a civic issue."
        ),
    }


# =========================================================
# CREATE REPORT
# =========================================================

@router.post(
    "/",
    response_model=ReportResponse,
)
async def create_report(
    image: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    address: str | None = Form(None),
    description: str | None = Form(None),
    db: Session = Depends(get_db),
):
    try:
        # TEMPORARY USER ID
        # Later replace this with logged-in user's ID.
        reported_by = 1

        issue = CivicIssue(
            title="Civic Issue",
            description=description or "",
            reported_by=reported_by,
            latitude=latitude,
            longitude=longitude,
            image_url=None,
            severity="MEDIUM",
        )

        db.add(issue)
        db.commit()
        db.refresh(issue)

        return issue

    except Exception as e:
        db.rollback()

        print(
            "CREATE REPORT ERROR:",
            repr(e),
        )

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# =========================================================
# GET ALL REPORTS
# =========================================================

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


# =========================================================
# GET SINGLE REPORT
# =========================================================

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