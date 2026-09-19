import os
from uuid import uuid4

import boto3


class S3Storage:

    def __init__(self):

        self.bucket = os.getenv(
            "AWS_S3_BUCKET"
        )

        self.region = os.getenv(
            "AWS_REGION",
            "us-east-1",
        )

        self.client = boto3.client(
            "s3",
            region_name=self.region,
        )

    def upload(
        self,
        file,
        folder: str = "images",
    ) -> str:

        if not self.bucket:
            raise ValueError(
                "AWS_S3_BUCKET is not configured"
            )

        original_name = getattr(
            file,
            "filename",
            "file",
        )

        extension = ""

        if "." in original_name:
            extension = (
                "."
                + original_name.split(".")[-1]
            )

        key = (
            f"{folder}/"
            f"{uuid4().hex}"
            f"{extension}"
        )

        self.client.upload_fileobj(
            file.file,
            self.bucket,
            key,
            ExtraArgs={
                "ContentType": getattr(
                    file,
                    "content_type",
                    "application/octet-stream",
                )
            },
        )

        return (
            f"https://{self.bucket}.s3."
            f"{self.region}.amazonaws.com/"
            f"{key}"
        )

    def delete(
        self,
        key: str,
    ):

        self.client.delete_object(
            Bucket=self.bucket,
            Key=key,
        )