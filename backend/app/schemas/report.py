from pydantic import BaseModel, ConfigDict


class ReportCreate(BaseModel):

    title: str
    description: str
    reported_by: int

    latitude: float | None = None
    longitude: float | None = None

    image_url: str | None = None

    severity: str | None = "MEDIUM"


class ReportResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    title: str
    description: str
    reported_by: int

    latitude: float | None
    longitude: float | None

    image_url: str | None

    severity: str
    status: str
    ai_confidence: float