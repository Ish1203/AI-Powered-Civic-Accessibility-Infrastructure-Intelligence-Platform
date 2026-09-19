from pathlib import Path
from typing import Tuple


class ImageProcessor:

    ALLOWED_EXTENSIONS = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    }

    def validate_path(
        self,
        image_path: str,
    ) -> bool:

        path = Path(image_path)

        return (
            path.is_file()
            and path.suffix.lower()
            in self.ALLOWED_EXTENSIONS
        )

    def get_size(
        self,
        image_path: str,
    ) -> Tuple[int, int]:

        from PIL import Image

        with Image.open(image_path) as image:
            return image.size

    def resize(
        self,
        image_path: str,
        output_path: str,
        max_size: int = 1280,
    ) -> str:

        from PIL import Image

        with Image.open(image_path) as image:

            image = image.convert("RGB")

            image.thumbnail(
                (max_size, max_size)
            )

            image.save(
                output_path,
                quality=90,
            )

        return output_path