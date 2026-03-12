import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [ CommonModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.scss',
})
export class AttendanceListComponent {
  attendanceRecords: any[] = [
    {
      employee_name: 'John Doe',
      date: '2026-03-12',
      status: 'Present'
    },
    {
      employee_name: 'Jane Smith',
      date: '2026-03-12',
      status: 'Absent'
    },
    {
      employee_name: 'Mike Johnson',
      date: '2026-03-11',
      status: 'Present'
    }
  ];

}
