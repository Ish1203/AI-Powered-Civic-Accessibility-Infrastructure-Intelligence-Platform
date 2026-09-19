from pathlib import Path
from typing import Dict, Any


class RealInference:

    def __init__(
        self,
        model_path: str | None = None,
    ):

        self.model_path = model_path
        self._model = None

    def is_available(self) -> bool:

        if not self.model_path:
            return False

        if not Path(self.model_path).exists():
            return False

        try:
            import ultralytics

            return True

        except ImportError:
            return False

    def predict(
        self,
        image_path: str,
        text: str = "",
    ) -> Dict[str, Any]:

        from app.ai.models.yolo_model import YOLOModel

        if self._model is None:
            self._model = YOLOModel(
                self.model_path
            )

        return self._model.predict(
            image_path=image_path,
            text=text,
        )