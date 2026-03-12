import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employees/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { AttendanceListComponent } from './components/attendance/attendance-list/attendance-list.component';

export const routes: Routes = [
     {
    path: '',
    redirectTo: 'add-employee',
    pathMatch: 'full'
  },

 {
  path: 'employees',
  component: EmployeeListComponent
},
{
  path: 'add-employee',
  component: EmployeeFormComponent
},
{
  path: 'attendance',
  component: AttendanceListComponent
}

];
