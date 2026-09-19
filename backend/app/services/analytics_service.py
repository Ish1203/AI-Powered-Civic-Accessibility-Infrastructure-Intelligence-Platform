from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.civic_issue import CivicIssue


class AnalyticsService:

    @staticmethod
    def summary(
        db: Session,
    ):

        total = (
            db.query(
                func.count(
                    CivicIssue.id
                )
            ).scalar()
            or 0
        )

        resolved = (
            db.query(
                func.count(
                    CivicIssue.id
                )
            )
            .filter(
                CivicIssue.status
                == "RESOLVED"
            )
            .scalar()
            or 0
        )

        pending = total - resolved

        resolution_rate = (
            (resolved / total) * 100
            if total
            else 0
        )

        return {
            "total_issues": total,
            "resolved_issues": resolved,
            "pending_issues": pending,
            "resolution_rate": round(
                resolution_rate,
                2,
            ),
        }