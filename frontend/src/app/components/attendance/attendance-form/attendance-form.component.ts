import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/employee.model';
import { AttendanceService } from '../../../services/attendance.service';
import { EmployeeService } from '../../../services/employee.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-attendance-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './attendance-form.component.html',
  styleUrl: './attendance-form.component.scss',
})
export class AttendanceFormComponent implements OnInit {
  attendanceForm: FormGroup;
  submitted = false;
employees: Employee[] = [];
  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
  ) {
    this.attendanceForm = this.fb.group({
      employee_id: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  onSubmit() {
    this.submitted = true;

    if (this.attendanceForm.invalid) {
      return;
    }

    const formValue = this.attendanceForm.value;

    const payload = {
      ...formValue,
      date: formValue.date.toISOString().split('T')[0], // convert to YYYY-MM-DD
    };

    this.attendanceService.markAttendance(payload).subscribe({
      next: (res) => {
        this.snackBar.open('Attendance recorded successfully', 'Close', {
          duration: 3000,
        });

        this.attendanceForm.reset();
        this.attendanceForm.markAsPristine();
        this.attendanceForm.markAsUntouched();
        this.submitted = false;
      },

      error: (err) => {
        this.snackBar.open(err.error.detail || 'Error marking attendance', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
