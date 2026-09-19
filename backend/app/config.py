import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./accesspath.db",
    )

    JWT_SECRET_KEY: str = os.getenv(
        "JWT_SECRET_KEY",
        "change-this-secret-key",
    )

    JWT_ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    AWS_REGION: str = os.getenv(
        "AWS_REGION",
        "us-east-1",
    )

    BEDROCK_MODEL_ID: str = os.getenv(
        "BEDROCK_MODEL_ID",
        "amazon.nova-lite-v1:0",
    )


settings = Settings()