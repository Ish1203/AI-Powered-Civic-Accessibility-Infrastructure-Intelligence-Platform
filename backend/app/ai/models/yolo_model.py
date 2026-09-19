from typing import Dict, Any

from app.ai.models.base_model import BaseModel


class YOLOModel(BaseModel):

    def __init__(self, model_path: str):

        self.model_path = model_path
        self._model = None

    def _load(self):

        if self._model is None:

            from ultralytics import YOLO

            self._model = YOLO(
                self.model_path
            )

        return self._model

    def predict(
        self,
        image_path: str,
        text: str = "",
    ) -> Dict[str, Any]:

        model = self._load()

        results = model.predict(
            source=image_path,
            verbose=False,
        )

        detections = []

        for result in results:

            if result.boxes is None:
                continue

            names = result.names

            classes = result.boxes.cls.tolist()
            confidences = result.boxes.conf.tolist()

            for cls_id, confidence in zip(
                classes,
                confidences,
            ):

                label = names[int(cls_id)]

                detections.append(
                    {
                        "label": label,
                        "confidence": round(
                            float(confidence),
                            4,
                        ),
                    }
                )

        if detections:

            best = max(
                detections,
                key=lambda x: x["confidence"],
            )

            return {
                "label": best["label"],
                "confidence": best["confidence"],
                "source": "yolo",
                "detections": detections,
            }

        return {
            "label": "No issue detected",
            "confidence": 0.0,
            "source": "yolo",
            "detections": [],
        }