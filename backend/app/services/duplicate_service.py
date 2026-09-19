from sqlalchemy.orm import Session

from app.models.civic_issue import CivicIssue


class DuplicateService:

    @staticmethod
    def find_duplicate(
        db: Session,
        latitude: float,
        longitude: float,
        title: str,
        radius: float = 0.001,
    ):

        issues = (
            db.query(CivicIssue)
            .filter(
                CivicIssue.latitude.between(
                    latitude - radius,
                    latitude + radius,
                ),
                CivicIssue.longitude.between(
                    longitude - radius,
                    longitude + radius,
                ),
            )
            .all()
        )

        title_words = set(
            title.lower().split()
        )

        for issue in issues:

            issue_words = set(
                issue.title.lower().split()
            )

            overlap = (
                len(title_words & issue_words)
            )

            if overlap >= 1:
                return issue

        return None