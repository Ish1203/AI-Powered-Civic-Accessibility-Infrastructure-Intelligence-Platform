from sqlalchemy.orm import Session

from app.models.civic_issue import CivicIssue


class IssueRepository:

    @staticmethod
    def get_by_id(
        db: Session,
        issue_id: int,
    ):
        return (
            db.query(CivicIssue)
            .filter(CivicIssue.id == issue_id)
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
        status: str | None = None,
        severity: str | None = None,
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

        return (
            query
            .order_by(
                CivicIssue.created_at.desc()
            )
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        issue: CivicIssue,
    ):

        db.add(issue)
        db.commit()
        db.refresh(issue)

        return issue

    @staticmethod
    def update(
        db: Session,
        issue: CivicIssue,
    ):

        db.commit()
        db.refresh(issue)

        return issue