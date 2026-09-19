from sqlalchemy import create_engine
from app.config import settings


engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
)


def init_db():
    from app.database.base import Base
    from app.models import user
    from app.models import role
    from app.models import civic_issue
    from app.models import issue_category
    from app.models import department
    from app.models import assignment
    from app.models import audit_log
    from app.models import citizen_verification

    Base.metadata.create_all(bind=engine)