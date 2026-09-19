from sqlalchemy.orm import Session

from app.models.department import Department


class DepartmentRepository:

    @staticmethod
    def get_by_id(
        db: Session,
        department_id: int,
    ):

        return (
            db.query(Department)
            .filter(
                Department.id == department_id
            )
            .first()
        )

    @staticmethod
    def get_all(
        db: Session,
    ):

        return (
            db.query(Department)
            .filter(
                Department.is_active == True
            )
            .order_by(
                Department.name
            )
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        department: Department,
    ):

        db.add(department)
        db.commit()
        db.refresh(department)

        return department