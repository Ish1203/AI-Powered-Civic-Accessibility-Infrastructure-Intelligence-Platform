from typing import Dict


class RoutingService:

    CATEGORY_DEPARTMENT_MAP = {

        "Pothole": "Road Department",
        "Road Damage": "Road Department",

        "Garbage": "Sanitation Department",

        "Broken Streetlight": (
            "Electrical Department"
        ),

        "Water Leakage": (
            "Water Supply Department"
        ),

        "Open Drain": (
            "Drainage Department"
        ),

        "Damaged Footpath": (
            "Public Works Department"
        ),

        "Fallen Tree": (
            "Parks Department"
        ),
    }

    @classmethod
    def get_department(
        cls,
        issue_type: str,
    ) -> str:

        return cls.CATEGORY_DEPARTMENT_MAP.get(
            issue_type,
            "General Civic Department",
        )

    @classmethod
    def route_issue(
        cls,
        issue_type: str,
    ) -> Dict[str, str]:

        return {
            "issue_type": issue_type,
            "department": cls.get_department(
                issue_type
            ),
        }