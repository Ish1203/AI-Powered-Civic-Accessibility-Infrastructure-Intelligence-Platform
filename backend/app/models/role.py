from enum import Enum


class UserRole(str, Enum):

    CITIZEN = "CITIZEN"
    AUTHORITY = "AUTHORITY"
    ADMIN = "ADMIN"