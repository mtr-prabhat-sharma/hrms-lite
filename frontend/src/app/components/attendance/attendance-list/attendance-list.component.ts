import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AttendanceService } from '../../../services/attendance.service';
import { Attendance } from '../../../models/attendance.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, RouterModule],
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit{
  constructor(private attendanceService: AttendanceService) {}
  attendanceRecords: Attendance[] = [];
  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    this.attendanceService.getAttendance().subscribe({
      next: (data) => {
        this.attendanceRecords = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
