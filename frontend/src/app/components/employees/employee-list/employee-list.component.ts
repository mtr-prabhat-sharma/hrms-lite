import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  employees: Employee[] = [
    {
      employee_id: 'EMP001',
      full_name: 'John Doe',
      email: 'john@test.com',
      department: 'IT'
    },
    {
      employee_id: 'EMP002',
      full_name: 'Jane Smith',
      email: 'jane@test.com',
      department: 'HR'
    },
    {
      employee_id: 'EMP003',
      full_name: 'Mike Johnson',
      email: 'mike@test.com',
      department: 'Finance'
    }
  ];

  deleteEmployee(index: number) {
    this.employees.splice(index, 1);
  }
}
