import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AttendanceService } from '../../../services/attendance.service';
import { Attendance } from '../../../models/attendance.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { NoRecordsComponent } from '../../../shared/no-records/no-records.component';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    NoRecordsComponent
  ],
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit, AfterViewInit {
  constructor(private attendanceService: AttendanceService) {}
  
  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['employee_id', 'date', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadAttendance();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadAttendance() {
    this.attendanceService.getAttendance().subscribe({
      next: (data) => {
        this.dataSource.data = data;
            if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
