from app.ai.severity.severity_engine import (
    calculate_severity,
)


def test_high_severity():

    result = calculate_severity(
        confidence=0.95,
        issue_type="Pothole",
    )

    assert result in [
        "HIGH",
        "CRITICAL",
        "MEDIUM",
    ]


def test_low_confidence():

    result = calculate_severity(
        confidence=0.2,
        issue_type="Pothole",
    )

    assert result is not None