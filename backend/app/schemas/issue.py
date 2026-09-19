from pydantic import BaseModel


class IssueStatusUpdate(BaseModel):

    status: str


class IssueResponse(BaseModel):

    id: int
    title: str
    description: str
    severity: str
    status: str
    ai_confidence: float
    latitude: float | None = None
    longitude: float | None = None
    image_url: str | None = None