from pydantic import BaseModel


class VerificationCreate(BaseModel):

    user_id: int
    document_type: str
    document_number: str | None = None
    document_url: str | None = None


class VerificationResponse(BaseModel):

    id: int
    user_id: int
    document_type: str
    status: str
    document_url: str | None = None
    rejection_reason: str | None = None