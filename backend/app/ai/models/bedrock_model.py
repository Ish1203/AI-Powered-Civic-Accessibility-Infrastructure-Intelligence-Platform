import json
import os
from typing import Any, Dict

from app.ai.models.base_model import BaseModel


class BedrockModel(BaseModel):

    def __init__(
        self,
        model_id: str | None = None,
        region_name: str | None = None,
    ):

        self.model_id = model_id or os.getenv(
            "BEDROCK_MODEL_ID",
            "amazon.nova-lite-v1:0",
        )

        self.region_name = region_name or os.getenv(
            "AWS_REGION",
            "us-east-1",
        )

        self._client = None

    def _get_client(self):

        if self._client is None:

            import boto3

            self._client = boto3.client(
                "bedrock-runtime",
                region_name=self.region_name,
            )

        return self._client

    def predict(
        self,
        prompt: str,
        **kwargs: Any,
    ) -> Dict[str, Any]:

        client = self._get_client()

        response = client.converse(
            modelId=self.model_id,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "text": prompt
                        }
                    ],
                }
            ],
            inferenceConfig={
                "temperature": kwargs.get(
                    "temperature",
                    0.2,
                ),
                "maxTokens": kwargs.get(
                    "max_tokens",
                    1000,
                ),
            },
        )

        text = ""

        for block in response[
            "output"
        ][
            "message"
        ][
            "content"
        ]:

            if "text" in block:
                text += block["text"]

        try:

            return json.loads(text)

        except json.JSONDecodeError:

            return {
                "raw_response": text,
                "source": "aws_bedrock",
            }