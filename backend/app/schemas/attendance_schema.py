from pydantic import BaseModel
from datetime import date


class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str


class AttendanceResponse(BaseModel):
    id: int
    employee_id: str
    date: date
    status: str

    class Config:
        from_attributes = True