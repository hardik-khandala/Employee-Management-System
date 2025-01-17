import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { ProjectAssignComponent } from './components/project-assign/project-assign.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { employeeDetailsResolver } from './resolvers/employee-details.resolver';
import { subDetailsResolver } from './resolvers/sub-details.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
  {
    path: 'employees/new',
    component: EmployeeFormComponent,
  },

  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    resolve: { employee: employeeDetailsResolver },
    children: [
      {
        path: 'edit',
        component: EmployeeFormComponent,
        resolve: { employee: subDetailsResolver },
      },
      {
        path: 'personal',
        component: EmployeeFormComponent,
        resolve: { employee: subDetailsResolver },
      },
      {
        path: 'projects',
        component: ProjectListComponent,
        resolve: { employee: subDetailsResolver },
      },
      {
        path: 'projects-assign',
        component: ProjectAssignComponent,
        resolve: { employee: subDetailsResolver },
      },
    ],
  },
];
