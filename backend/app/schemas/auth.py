from pydantic import BaseModel, EmailStr, ConfigDict


class RegisterRequest(BaseModel):

    name: str
    email: EmailStr
    password: str
    phone: str | None = None


class LoginRequest(BaseModel):

    email: EmailStr
    password: str


class UserResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int
    name: str
    email: EmailStr
    role: str
    phone: str | None = None
    is_active: bool


class TokenResponse(BaseModel):

    access_token: str
    token_type: str
    user: UserResponse