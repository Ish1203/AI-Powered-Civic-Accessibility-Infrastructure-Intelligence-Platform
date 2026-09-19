from typing import Any, Dict, Iterable


def normalize_confidence(
    value: Any,
    default: float = 0.0,
) -> float:

    try:
        score = float(value)

    except (TypeError, ValueError):
        return default

    if score > 1:
        score /= 100

    return max(
        0.0,
        min(1.0, score),
    )


def add_confidence_level(
    result: Dict[str, Any],
) -> Dict[str, Any]:

    output = dict(result)

    confidence = normalize_confidence(
        output.get("confidence")
    )

    if confidence >= 0.80:
        level = "HIGH"

    elif confidence >= 0.55:
        level = "MEDIUM"

    else:
        level = "LOW"

    output["confidence"] = round(
        confidence,
        4,
    )

    output["confidence_level"] = level

    return output


def average_confidence(
    values: Iterable[Any],
) -> float:

    scores = [
        normalize_confidence(value)
        for value in values
    ]

    if not scores:
        return 0.0

    return round(
        sum(scores) / len(scores),
        4,
    )