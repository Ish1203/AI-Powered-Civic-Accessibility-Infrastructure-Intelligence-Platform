from pathlib import Path
import shutil
from uuid import uuid4


BASE_DIR = Path("uploads")
BASE_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


class LocalStorage:

    @staticmethod
    def save(
        file,
        folder: str = "images",
    ) -> str:

        upload_dir = BASE_DIR / folder

        upload_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        original_name = getattr(
            file,
            "filename",
            "file",
        )

        extension = Path(
            original_name
        ).suffix.lower()

        filename = (
            f"{uuid4().hex}"
            f"{extension}"
        )

        file_path = (
            upload_dir / filename
        )

        with open(
            file_path,
            "wb",
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer,
            )

        return str(file_path)

    @staticmethod
    def delete(
        file_path: str,
    ) -> bool:

        path = Path(file_path)

        if path.exists():

            path.unlink()

            return True

        return False