from sqlalchemy.orm import Session

from app.models.civic_issue import CivicIssue
from app.repositories.report_repository import (
    ReportRepository,
)


class ReportService:

    @staticmethod
    def create_report(
        db: Session,
        title: str,
        description: str,
        reported_by: int,
        latitude: float | None = None,
        longitude: float | None = None,
        image_url: str | None = None,
        severity: str = "MEDIUM",
    ):

        report = CivicIssue(
            title=title,
            description=description,
            reported_by=reported_by,
            latitude=latitude,
            longitude=longitude,
            image_url=image_url,
            severity=severity,
        )

        return ReportRepository.create(
            db,
            report,
        )

    @staticmethod
    def get_user_reports(
        db: Session,
        user_id: int,
    ):

        return ReportRepository.get_by_user(
            db,
            user_id,
        )

    @staticmethod
    def get_report(
        db: Session,
        report_id: int,
    ):

        return ReportRepository.get_by_id(
            db,
            report_id,
        )