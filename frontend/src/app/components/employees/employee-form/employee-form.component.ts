import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {

  employeeForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {

    this.employeeForm = this.fb.group({
      employee_id: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });

  }

  onSubmit() {

  this.submitted = true;

  if (this.employeeForm.invalid) {
    return;
  }

  this.employeeService.addEmployee(this.employeeForm.value)
  .subscribe({
    next: (res) => {
      console.log('Employee created', res);

      alert('Employee added successfully');

      this.employeeForm.reset();
      this.submitted = false;
    },
    error: (err) => {
      console.error(err);
      alert(err.error.detail || 'Error creating employee');
    }
  });

}
  
}
