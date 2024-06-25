import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {} from '@angular/common/http';
import { TaskService } from './features/tasks/task.service';
import { UserService } from './features/users/user.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule],
  template: `
    <section>
      <mat-toolbar color="primary">
        <span routerLink="/">Signals Crud</span>
      </mat-toolbar>

      <router-outlet />
    </section>
  `,
  styles: [
    `
      span {
        cursor: pointer;
      }
      mat-toolbar {
        justify-content: space-between;
      }
    `,
  ],
  providers: [
    TaskService,
    UserService,
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class AppComponent {
  public taskService = inject(TaskService);

  constructor() {
    effect(() => {
      localStorage.setItem(
        'TASKS',
        JSON.stringify(this.taskService.userTasks())
      );
    });
  }
}
