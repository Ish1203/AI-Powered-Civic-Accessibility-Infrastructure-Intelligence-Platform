import json
from typing import Any, Dict


def parse_ai_response(
    response: Any,
) -> Dict[str, Any]:

    if isinstance(response, dict):
        return response

    if isinstance(response, bytes):

        response = response.decode(
            "utf-8",
            errors="ignore",
        )

    if not isinstance(response, str):

        return {
            "raw_response": str(response)
        }

    text = response.strip()

    try:

        parsed = json.loads(text)

        if isinstance(parsed, dict):
            return parsed

        return {
            "data": parsed
        }

    except json.JSONDecodeError:
        pass

    # Extract JSON object if model returned markdown
    start = text.find("{")
    end = text.rfind("}")

    if start != -1 and end > start:

        try:

            parsed = json.loads(
                text[start:end + 1]
            )

            if isinstance(parsed, dict):
                return parsed

        except json.JSONDecodeError:
            pass

    return {
        "raw_response": text
    }