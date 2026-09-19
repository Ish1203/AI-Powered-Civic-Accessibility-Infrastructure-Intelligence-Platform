from sqlalchemy.orm import Session

from app.auth.jwt import create_access_token
from app.auth.password import (
    hash_password,
    verify_password,
)
from app.models.user import User
from app.repositories.user_repository import (
    UserRepository,
)


class AuthService:

    @staticmethod
    def register(
        db: Session,
        name: str,
        email: str,
        password: str,
        phone: str | None = None,
    ):

        existing = UserRepository.get_by_email(
            db,
            email,
        )

        if existing:
            raise ValueError(
                "Email already registered"
            )

        user = User(
            name=name,
            email=email,
            password_hash=hash_password(
                password
            ),
            phone=phone,
            role="CITIZEN",
        )

        return UserRepository.create(
            db,
            user,
        )

    @staticmethod
    def login(
        db: Session,
        email: str,
        password: str,
    ):

        user = UserRepository.get_by_email(
            db,
            email,
        )

        if not user:
            raise ValueError(
                "Invalid email or password"
            )

        if not verify_password(
            password,
            user.password_hash,
        ):
            raise ValueError(
                "Invalid email or password"
            )

        token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
                "role": user.role,
            }
        )

        return token, user