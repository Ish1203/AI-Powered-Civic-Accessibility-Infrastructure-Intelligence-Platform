from typing import Dict, Any


class SeverityEngine:

    HIGH = {
        "open manhole",
        "open drain",
        "major pothole",
        "fallen tree",
        "electrical hazard",
        "fire",
        "flood",
        "water leakage",
    }

    MEDIUM = {
        "pothole",
        "garbage",
        "broken streetlight",
        "damaged footpath",
        "road damage",
        "blocked drain",
    }

    def calculate(
        self,
        issue_type: str,
        confidence: float = 0.0,
        accessibility_impact: bool = False,
    ) -> Dict[str, Any]:

        issue = (
            issue_type or ""
        ).strip().lower()

        confidence = max(
            0.0,
            min(
                1.0,
                float(confidence or 0),
            ),
        )

        if issue in self.HIGH:

            severity = "HIGH"
            score = 0.85

        elif issue in self.MEDIUM:

            severity = "MEDIUM"
            score = 0.60

        else:

            severity = "LOW"
            score = 0.35

        if accessibility_impact:

            score += 0.15

            if score >= 0.80:
                severity = "HIGH"

            elif score >= 0.55:
                severity = "MEDIUM"

        score = min(
            1.0,
            score * (
                0.75 +
                0.25 * confidence
            ),
        )

        return {
            "severity": severity,
            "severity_score": round(
                score,
                4,
            ),
            "reason": self._reason(
                severity,
                accessibility_impact,
            ),
        }

    @staticmethod
    def _reason(
        severity: str,
        accessibility_impact: bool,
    ) -> str:

        reason = (
            f"Classified as "
            f"{severity.lower()} priority "
            f"based on issue type."
        )

        if accessibility_impact:

            reason += (
                " Accessibility impact "
                "increased the priority."
            )

        return reason