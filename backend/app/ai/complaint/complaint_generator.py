from typing import Any, Dict


class ComplaintGenerator:
    """Generate a formal civic complaint."""

    def generate(
        self,
        issue_type: str,
        description: str,
        location: str = "",
        severity: str = "MEDIUM",
        citizen_name: str = "Citizen",
    ) -> Dict[str, Any]:

        location_text = (
            location
            if location
            else "the reported location"
        )

        subject = (
            f"Complaint regarding "
            f"{issue_type.title()} issue"
        )

        body = (
            f"Respected Authority,\n\n"
            f"I am {citizen_name}, and I would like to "
            f"report a {issue_type.lower()} issue at "
            f"{location_text}.\n\n"
            f"Description: {description}\n"
            f"Severity: {severity}\n\n"
            f"I request the concerned department to "
            f"inspect the location and take appropriate "
            f"action at the earliest.\n\n"
            f"Thank you."
        )

        return {
            "subject": subject,
            "body": body,
            "issue_type": issue_type,
            "severity": severity,
            "location": location_text,
        }