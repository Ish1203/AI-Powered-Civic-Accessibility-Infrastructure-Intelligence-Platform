from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.assignment import Assignment


router = APIRouter()


@router.post("/")
def create_assignment(
    issue_id: int,
    authority_id: int,
    assigned_by: int | None = None,
    db: Session = Depends(get_db),
):

    assignment = Assignment(
        issue_id=issue_id,
        authority_id=authority_id,
        assigned_by=assigned_by,
    )

    db.add(assignment)
    db.commit()
    db.refresh(assignment)

    return assignment


@router.get("/")
def get_assignments(
    db: Session = Depends(get_db),
):

    return (
        db.query(Assignment)
        .order_by(
            Assignment.assigned_at.desc()
        )
        .all()
    )


@router.patch("/{assignment_id}")
def update_assignment(
    assignment_id: int,
    status: str,
    db: Session = Depends(get_db),
):

    assignment = (
        db.query(Assignment)
        .filter(
            Assignment.id == assignment_id
        )
        .first()
    )

    if not assignment:

        raise HTTPException(
            status_code=404,
            detail="Assignment not found",
        )

    assignment.status = status

    db.commit()
    db.refresh(assignment)

    return assignment