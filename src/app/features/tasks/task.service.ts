import {
  computed,
  DestroyRef,
  Injectable,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { UserService } from '../users/user.service';

import { Task } from './task.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TaskService {
  public destroyRef = inject(DestroyRef);

  public http = inject(HttpClient);

  public userService = inject(UserService);

  public snackBar = inject(MatSnackBar);

  public usersUrl = 'http://localhost:3000/users';

  public tasksUrl = 'http://localhost:3000/tasks';

  public userTasks = signal<Task[]>([]); //WriteblaSignal

  public userTotalTasks = computed(() => this.userTasks().length);

  private userTasks$ = toObservable(this.userService.selectedUserId).pipe(
    switchMap((userId) =>
      this.http.get<Task[]>(this.usersUrl + '/' + userId + '/tasks').pipe(
        tap((tasks) => {
          this.userTasks.set(tasks);
        })
      )
    )
  );

  public readOnlyUserTasks = toSignal(this.userTasks$, {
    initialValue: [] as Task[],
  });

  public addTaskStatus(newTask: Task): void {
    this.http
      .post(this.tasksUrl, newTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const responseTaks = response as Task;
          this.userTasks.update((task) => [...task, responseTaks]);
        },
        //! Error handling
      });
  }

  public updteTaskStatus(task: Task, completed: boolean): void {
    const completedTask = {
      ...task,
      completed: completed,
    };

    this.http
      .put(this.tasksUrl + '/' + task.id, completedTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.userTasks.update((tasks) =>
            tasks.map((_task) => (_task.id === task.id ? completedTask : _task))
          );
        },
        //! Error handling
      });
  }

  public deleteTask(taskId: number): void {
    this.http
      .delete(this.tasksUrl + '/' + taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.userTasks.update((tasks) =>
            tasks.filter((task) => task.id !== taskId)
          );
        },
        //! Error handling
      });
  }
}
