from app.ai.postprocessing.confidence import (
    normalize_confidence,
)


def test_confidence_range():

    result = normalize_confidence(
        0.85
    )

    assert 0 <= result <= 1