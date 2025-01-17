import { inject, Injectable } from '@angular/core';
import { Project } from '../models/Projects';
import { EmployeeService } from './employee.service';
import { filter, map, Observable } from 'rxjs';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  
  projects: Array<Project> = [
    {
      id: 'fs5434gst',
      title: 'ChatApplication',
    },
    {
      id: 'ws5434gyt',
      title: 'Zero Threat',
    },
    {
      id: 'h34gsuy',
      title: 'OnPrintshop',
    },
    {
      id: '74rgaswrt',
      title: 'Fabrika',
    },
    {
      id: 'uqwk342q',
      title: 'Reactjs',
    },
  ];

  empService = inject(EmployeeService);

  getAssignedProjects$(id: string) {
    return this.empService.employeeData$.pipe(
      map((data) => data.find((emp) => emp.id === id)),
      map((emp) =>
        this.projects.filter((pr) => emp?.projects.find((pid) => pid === pr.id))
      )
    );
  }
}
