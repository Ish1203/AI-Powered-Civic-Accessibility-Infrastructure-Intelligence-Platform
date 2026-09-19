from app.services.duplicate_service import (
    DuplicateService,
)


def test_duplicate_service_exists():

    assert hasattr(
        DuplicateService,
        "find_duplicate",
    )