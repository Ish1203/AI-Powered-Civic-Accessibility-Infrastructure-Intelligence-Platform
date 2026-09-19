from abc import ABC, abstractmethod
from typing import Any, Dict


class BaseModel(ABC):

    @abstractmethod
    def predict(
        self,
        *args: Any,
        **kwargs: Any,
    ) -> Dict[str, Any]:

        raise NotImplementedError