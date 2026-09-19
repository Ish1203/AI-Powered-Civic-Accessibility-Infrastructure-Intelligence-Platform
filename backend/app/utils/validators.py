import re


ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}

MAX_IMAGE_SIZE = 10 * 1024 * 1024


def validate_email(
    email: str,
) -> bool:

    pattern = (
        r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
    )

    return bool(
        re.match(
            pattern,
            email,
        )
    )


def validate_coordinates(
    latitude: float,
    longitude: float,
) -> bool:

    return (
        -90 <= latitude <= 90
        and
        -180 <= longitude <= 180
    )


def validate_image(
    content_type: str,
    size: int,
) -> bool:

    if content_type not in ALLOWED_IMAGE_TYPES:
        return False

    if size > MAX_IMAGE_SIZE:
        return False

    return True