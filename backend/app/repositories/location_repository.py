from sqlalchemy.orm import Session


class LocationRepository:

    @staticmethod
    def nearby_issues(
        db: Session,
        latitude: float,
        longitude: float,
        radius: float = 0.01,
    ):

        from app.models.civic_issue import CivicIssue

        return (
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