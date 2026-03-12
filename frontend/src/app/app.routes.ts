import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employees/employee-form/employee-form.component';

export const routes: Routes = [
     {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },

  {
    path: 'employees',
    component: EmployeeFormComponent
  }

];
