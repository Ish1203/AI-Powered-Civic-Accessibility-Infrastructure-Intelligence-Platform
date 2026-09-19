from typing import Dict, List


class NotificationService:

    def __init__(self):

        self.notifications: List[
            Dict
        ] = []

    def create_notification(
        self,
        user_id: int,
        title: str,
        message: str,
        notification_type: str = "INFO",
    ):

        notification = {
            "id": len(
                self.notifications
            ) + 1,

            "user_id": user_id,

            "title": title,

            "message": message,

            "type": notification_type,

            "read": False,
        }

        self.notifications.append(
            notification
        )

        return notification

    def get_notifications(
        self,
        user_id: int,
    ):

        return [
            notification
            for notification
            in self.notifications
            if notification["user_id"] == user_id
        ]

    def mark_read(
        self,
        notification_id: int,
    ):

        for notification in self.notifications:

            if notification["id"] == notification_id:

                notification["read"] = True

                return notification

        return None