from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.attendance_model import Attendance
from app.models.employee_model import Employee
from app.schemas.attendance_schema import AttendanceCreate, AttendanceResponse

router = APIRouter(prefix="/attendance", tags=["Attendance"])


# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# MARK ATTENDANCE
@router.post("/", response_model=AttendanceResponse)
def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):

    # Check if employee exists
    employee = db.query(Employee).filter(
        Employee.employee_id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    new_attendance = Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance


# GET ALL ATTENDANCE RECORDS
@router.get("/", response_model=list[AttendanceResponse])
def get_attendance(db: Session = Depends(get_db)):

    attendance_records = db.query(Attendance).all()

    return attendance_records