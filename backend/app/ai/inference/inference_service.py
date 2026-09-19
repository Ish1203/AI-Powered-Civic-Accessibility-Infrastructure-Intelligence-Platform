from typing import Dict, Any

from app.ai.inference.demo_inference import DemoInference
from app.ai.inference.real_inference import RealInference


class InferenceService:

    def __init__(self):

        self.demo = DemoInference()
        self.real = RealInference()

    def predict(
        self,
        image_path: str | None = None,
        text: str = "",
        filename: str = "",
    ) -> Dict[str, Any]:

        if image_path and self.real.is_available():

            try:
                return self.real.predict(
                    image_path=image_path,
                    text=text,
                )

            except Exception:
                pass

        return self.demo.predict(
            text=text,
            filename=filename,
        )