from typing import Any, Dict, List


class AccessibilityEngine:
    """Detect whether a civic issue can affect accessibility."""

    ACCESSIBILITY_KEYWORDS = {
        "wheelchair",
        "ramp",
        "footpath",
        "sidewalk",
        "pavement",
        "blind",
        "visually impaired",
        "disabled",
        "accessibility",
        "barrier",
        "obstruction",
        "stairs",
        "crosswalk",
        "kerb",
        "curb",
    }

    def analyze(
        self,
        text: str = "",
        detections: List[Dict[str, Any]] | None = None,
    ) -> Dict[str, Any]:

        text_lower = (text or "").lower()

        matched_keywords = [
            keyword
            for keyword in self.ACCESSIBILITY_KEYWORDS
            if keyword in text_lower
        ]

        detection_labels = []

        for detection in detections or []:
            label = str(
                detection.get("label", "")
            ).lower()

            if label:
                detection_labels.append(label)

        detection_match = any(
            keyword in label
            for label in detection_labels
            for keyword in self.ACCESSIBILITY_KEYWORDS
        )

        is_accessibility_issue = (
            len(matched_keywords) > 0
            or detection_match
        )

        if matched_keywords:
            confidence = 0.90
        elif detection_match:
            confidence = 0.75
        else:
            confidence = 0.10

        return {
            "is_accessibility_issue": is_accessibility_issue,
            "confidence": confidence,
            "matched_keywords": matched_keywords,
            "reason": (
                "Issue may affect accessibility or mobility."
                if is_accessibility_issue
                else
                "No clear accessibility impact detected."
            ),
        }