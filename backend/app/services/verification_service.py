from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.models.citizen_verification import (
    CitizenVerification,
)


class VerificationService:

    @staticmethod
    def submit(
        db: Session,
        user_id: int,
        document_type: str,
        document_number: str | None = None,
        document_url: str | None = None,
    ):

        verification = CitizenVerification(
            user_id=user_id,
            document_type=document_type,
            document_number=document_number,
            document_url=document_url,
            status="PENDING",
        )

        db.add(verification)
        db.commit()
        db.refresh(verification)

        return verification

    @staticmethod
    def approve(
        db: Session,
        verification_id: int,
    ):

        verification = (
            db.query(
                CitizenVerification
            )
            .filter(
                CitizenVerification.id
                == verification_id
            )
            .first()
        )

        if not verification:
            raise ValueError(
                "Verification not found"
            )

        verification.status = "VERIFIED"

        verification.verified_at = (
            datetime.now(timezone.utc)
        )

        db.commit()
        db.refresh(verification)

        return verification

    @staticmethod
    def reject(
        db: Session,
        verification_id: int,
        reason: str,
    ):

        verification = (
            db.query(
                CitizenVerification
            )
            .filter(
                CitizenVerification.id
                == verification_id
            )
            .first()
        )

        if not verification:
            raise ValueError(
                "Verification not found"
            )

        verification.status = "REJECTED"

        verification.rejection_reason = reason

        db.commit()
        db.refresh(verification)

        return verification