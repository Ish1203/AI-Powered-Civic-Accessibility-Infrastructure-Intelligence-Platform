from sqlalchemy.orm import Session

from app.models.civic_issue import CivicIssue
from app.repositories.issue_repository import (
    IssueRepository,
)


class IssueService:

    @staticmethod
    def get_issue(
        db: Session,
        issue_id: int,
    ):

        return IssueRepository.get_by_id(
            db,
            issue_id,
        )

    @staticmethod
    def get_issues(
        db: Session,
        status: str | None = None,
        severity: str | None = None,
    ):

        return IssueRepository.get_all(
            db,
            status,
            severity,
        )

    @staticmethod
    def update_status(
        db: Session,
        issue_id: int,
        status: str,
    ):

        issue = IssueRepository.get_by_id(
            db,
            issue_id,
        )

        if not issue:
            raise ValueError(
                "Issue not found"
            )

        issue.status = status

        return IssueRepository.update(
            db,
            issue,
        )

    @staticmethod
    def create(
        db: Session,
        title: str,
        description: str,
        reported_by: int,
        severity: str = "MEDIUM",
        latitude: float | None = None,
        longitude: float | None = None,
        image_url: str | None = None,
        ai_confidence: float = 0.0,
    ):

        issue = CivicIssue(
            title=title,
            description=description,
            reported_by=reported_by,
            severity=severity,
            latitude=latitude,
            longitude=longitude,
            image_url=image_url,
            ai_confidence=ai_confidence,
        )

        return IssueRepository.create(
            db,
            issue,
        )