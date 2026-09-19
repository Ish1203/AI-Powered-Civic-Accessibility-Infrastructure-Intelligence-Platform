import re


def sanitize_text(
    text: str,
) -> str:

    if not text:
        return ""

    text = text.strip()

    text = re.sub(
        r"<[^>]*>",
        "",
        text,
    )

    return text


def validate_password(
    password: str,
) -> bool:

    if len(password) < 8:
        return False

    has_letter = bool(
        re.search(
            r"[A-Za-z]",
            password,
        )
    )

    has_number = bool(
        re.search(
            r"\d",
            password,
        )
    )

    return (
        has_letter
        and has_number
    )