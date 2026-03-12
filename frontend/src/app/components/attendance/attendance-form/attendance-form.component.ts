import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/employee.model';
import { AttendanceService } from '../../../services/attendance.service';


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
    MatCardModule
  ],
  templateUrl: './attendance-form.component.html',
  styleUrl: './attendance-form.component.scss',
})
export class AttendanceFormComponent {
    attendanceForm: FormGroup;
  submitted = false;

  employees: Employee[] = [
    { employee_id: 'EMP001', full_name: 'John Doe' },
    { employee_id: 'EMP002', full_name: 'Jane Smith' },
    { employee_id: 'EMP003', full_name: 'Mike Johnson' }
  ];

  constructor(private fb: FormBuilder,  private attendanceService: AttendanceService) {

    this.attendanceForm = this.fb.group({
      employee_id: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required]
    });

  }

 onSubmit() {

  this.submitted = true;

  if (this.attendanceForm.invalid) {
    return;
  }

  this.attendanceService.markAttendance(this.attendanceForm.value)
  .subscribe({
    next: (res) => {
      console.log('Attendance saved', res);

      alert('Attendance recorded');

      this.attendanceForm.reset();
      this.submitted = false;
    },
    error: (err) => {
      console.error(err);
      alert(err.error.detail || 'Error marking attendance');
    }
  });

}

}
