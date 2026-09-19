from pathlib import Path


class ImageValidator:

    ALLOWED_EXTENSIONS = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    }

    MAX_SIZE_MB = 10

    def validate(
        self,
        image_path: str,
    ) -> tuple[bool, str]:

        path = Path(image_path)

        if not path.exists():

            return (
                False,
                "Image does not exist.",
            )

        if (
            path.suffix.lower()
            not in self.ALLOWED_EXTENSIONS
        ):

            return (
                False,
                "Unsupported image format.",
            )

        size_mb = (
            path.stat().st_size
            / (1024 * 1024)
        )

        if size_mb > self.MAX_SIZE_MB:

            return (
                False,
                "Image is larger than 10 MB.",
            )

        return (
            True,
            "Valid image.",
        )