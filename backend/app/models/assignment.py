from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Assignment(Base):

    __tablename__ = "assignments"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    issue_id: Mapped[int] = mapped_column(
        ForeignKey("civic_issues.id"),
        nullable=False,
    )

    authority_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    assigned_by: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="ASSIGNED",
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    assigned_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
    )