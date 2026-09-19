from pydantic import BaseModel


class AssignmentCreate(BaseModel):

    issue_id: int
    authority_id: int
    assigned_by: int | None = None
    notes: str | None = None


class AssignmentUpdate(BaseModel):

    status: str


class AssignmentResponse(BaseModel):

    id: int
    issue_id: int
    authority_id: int
    assigned_by: int | None
    status: str
    notes: str | None