import { Routes } from '@angular/router';
import { UsersListComponent } from './features/users/users-list.component';
import { TaskDetailsComponent } from './features/tasks/task-details.component';

export const routes: Routes = [
  { path: "", pathMatch: 'full', component: UsersListComponent },
  { path: "tasks/:id", component: TaskDetailsComponent },
];
