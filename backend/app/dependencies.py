from fastapi import (
    Depends,
    HTTPException,
    status,
)
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)
from sqlalchemy.orm import Session

from app.auth.jwt import decode_access_token
from app.database.session import get_db
from app.models.user import User


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(
        security
    ),
    db: Session = Depends(get_db),
):

    token = credentials.credentials

    payload = decode_access_token(token)

    if not payload:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user_id = payload.get("sub")

    if not user_id:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    user = (
        db.query(User)
        .filter(
            User.id == int(user_id)
        )
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    if not user.is_active:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    return user


def require_citizen(
    current_user=Depends(
        get_current_user
    ),
):

    if current_user.role != "CITIZEN":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Citizen access required",
        )

    return current_user


def require_authority(
    current_user=Depends(
        get_current_user
    ),
):

    if current_user.role != "AUTHORITY":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Authority access required",
        )

    return current_user


def require_admin(
    current_user=Depends(
        get_current_user
    ),
):

    if current_user.role != "ADMIN":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    return current_user