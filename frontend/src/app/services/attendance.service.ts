import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Attendance } from '../models/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
    private apiUrl = 'http://127.0.0.1:8000/attendance';

  constructor(private http: HttpClient) {}

  // GET attendance records
  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  // MARK attendance
  markAttendance(data: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.apiUrl, data);
  }

}
