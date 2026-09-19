from sqlalchemy.orm import Session

from app.models.civic_issue import CivicIssue


class ReportRepository:

    @staticmethod
    def create(
        db: Session,
        report: CivicIssue,
    ):

        db.add(report)
        db.commit()
        db.refresh(report)

        return report

    @staticmethod
    def get_by_id(
        db: Session,
        report_id: int,
    ):

        return (
            db.query(CivicIssue)
            .filter(
                CivicIssue.id == report_id
            )
            .first()
        )

    @staticmethod
    def get_by_user(
        db: Session,
        user_id: int,
    ):

        return (
            db.query(CivicIssue)
            .filter(
                CivicIssue.reported_by == user_id
            )
            .order_by(
                CivicIssue.created_at.desc()
            )
            .all()
        )

    @staticmethod
    def get_all(
        db: Session,
    ):

        return (
            db.query(CivicIssue)
            .order_by(
                CivicIssue.created_at.desc()
            )
            .all()
        )