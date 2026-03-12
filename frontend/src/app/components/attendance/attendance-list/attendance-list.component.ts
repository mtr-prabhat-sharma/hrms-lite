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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    NoRecordsComponent,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit, AfterViewInit {
  constructor(
    private attendanceService: AttendanceService,
    private snackBar: MatSnackBar,
  ) {}

  dataSource = new MatTableDataSource<any>();
  loading: boolean = true;
  displayedColumns: string[] = ['employee_id', 'employee_name', 'date', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadAttendance();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadAttendance() {
    this.loading = true;
    this.attendanceService.getAttendance().subscribe({
      next: (data) => {
        console.log('data', data);
        this.dataSource.data = data;
        this.loading = false;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },

      error: (err) => {
        this.snackBar.open(err.error.detail, 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
