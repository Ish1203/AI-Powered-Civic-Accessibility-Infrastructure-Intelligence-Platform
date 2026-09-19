from sqlalchemy.orm import Session

from app.repositories.location_repository import (
    LocationRepository,
)


class LocationService:

    @staticmethod
    def find_nearby_issues(
        db: Session,
        latitude: float,
        longitude: float,
        radius: float = 0.01,
    ):

        return LocationRepository.nearby_issues(
            db,
            latitude,
            longitude,
            radius,
        )