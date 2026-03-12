from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

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

    try:
        db.add(new_attendance)
        db.commit()
        db.refresh(new_attendance)

        return {
            "employee_id": new_attendance.employee_id,
            "employee_name": employee.full_name,
            "date": new_attendance.date,
            "status": new_attendance.status
        }

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Attendance already recorded for this employee on this date"
        )


# GET ALL ATTENDANCE RECORDS
@router.get("/", response_model=list[AttendanceResponse])
def get_attendance(db: Session = Depends(get_db)):

    records = (
        db.query(Attendance, Employee.full_name)
        .join(Employee, Attendance.employee_id == Employee.employee_id)
        .all()
    )

    result = []

    for attendance, name in records:
        result.append({
            "employee_id": attendance.employee_id,
            "employee_name": name,
            "date": attendance.date,
            "status": attendance.status
        })

    return result