from pydantic import BaseModel


class LocationCreate(BaseModel):

    latitude: float
    longitude: float
    address: str | None = None


class LocationResponse(BaseModel):

    latitude: float
    longitude: float
    address: str | None = None