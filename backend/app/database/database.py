from sqlalchemy import create_engine

from app.config import settings
from app.database.base import Base


engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
)


def init_db():

    # Import models so SQLAlchemy registers them
    from app.models.user import User
    from app.models.civic_issue import CivicIssue
    from app.models.issue_category import IssueCategory
    from app.models.department import Department
    from app.models.assignment import Assignment
    from app.models.audit_log import AuditLog
    from app.models.citizen_verification import (
        CitizenVerification
    )

    Base.metadata.create_all(
        bind=engine
    )