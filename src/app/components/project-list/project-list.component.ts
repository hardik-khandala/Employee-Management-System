import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  eid: string = '';
  constructor(private ac: ActivatedRoute) {
    ac.data.subscribe((data) => {
      this.eid = data['employee'][0].id;
    });
  }
  projectService = inject(ProjectsService);
  employeeSer = inject(EmployeeService);
  assignProject(id: string) {
    this.employeeSer.assignProject(id, this.eid);
  }

  getProjects$() {
    return this.projectService
      .getAssignedProjects$(this.eid)
      .pipe(
        map((data) =>
          data.length > 0
            ? this.projectService.projects.filter((pr) => !data.includes(pr))
            : this.projectService.projects
        )
      );
  }
}
