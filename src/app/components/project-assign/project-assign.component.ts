import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-assign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-assign.component.html',
})
export class ProjectAssignComponent {
  eid: string = '';

  constructor(private ac: ActivatedRoute) {
    ac.data.subscribe((data) => {
      this.eid = data['employee'][0].id;
    });
  }

  projectService = inject(ProjectsService);
  empService = inject(EmployeeService);
}
