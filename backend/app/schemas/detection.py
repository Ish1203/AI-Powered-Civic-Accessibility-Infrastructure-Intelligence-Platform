from pydantic import BaseModel


class Detection(BaseModel):

    label: str
    confidence: float


class DetectionResponse(BaseModel):

    label: str
    confidence: float
    source: str
    detections: list[Detection] = []