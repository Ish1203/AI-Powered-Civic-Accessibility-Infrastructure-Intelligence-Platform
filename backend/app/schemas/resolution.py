from pydantic import BaseModel


class ResolutionCreate(BaseModel):

    issue_id: int
    evidence_url: str | None = None
    description: str | None = None


class ResolutionResponse(BaseModel):

    issue_id: int
    status: str
    evidence_url: str | None = None
    verified: bool = False