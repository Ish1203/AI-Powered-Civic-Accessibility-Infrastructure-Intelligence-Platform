from datetime import datetime


def generate_civic_id(
    issue_id: int,
) -> str:

    year = datetime.now().year

    return (
        f"AP-{year}-"
        f"{issue_id:06d}"
    )