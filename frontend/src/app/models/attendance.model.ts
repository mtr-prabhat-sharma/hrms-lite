export interface Attendance {
  id?: number;
  employee_id: string;
  date: string;
  status: 'Present' | 'Absent';
}