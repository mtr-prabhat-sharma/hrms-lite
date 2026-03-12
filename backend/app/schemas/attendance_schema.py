from pydantic import BaseModel
from datetime import date


class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str


class AttendanceResponse(BaseModel):
    employee_id: str
    employee_name: str
    date: date
    status: str

    class Config:
        from_attributes = True