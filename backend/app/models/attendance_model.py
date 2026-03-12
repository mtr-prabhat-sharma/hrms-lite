from sqlalchemy import Column, Integer, String, Date
from app.database.db import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(String(50), nullable=False)

    date = Column(Date, nullable=False)

    status = Column(String(20), nullable=False)