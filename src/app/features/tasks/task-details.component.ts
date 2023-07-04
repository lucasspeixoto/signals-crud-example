import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TaskService } from './task.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../users/user.service';
import { MatDividerModule } from '@angular/material/divider';
import { Task } from './task.model';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <div class="container__header">
        <span>Tasks {{ selectedUserName() }}</span>
        <button mat-fab color="accent" (click)="addNewTask()">
          <mat-icon>add_circle</mat-icon>
        </button>
      </div>

      <table mat-table [dataSource]="userTasks()" class="mat-elevation-z8">
        <ng-container
          [matColumnDef]="column"
          *ngFor="let column of displayedColumns"
        >
          <th mat-header-cell *matHeaderCellDef>{{ column | titlecase }}</th>
          <ng-container [ngSwitch]="column" ]>
            <ng-container *ngSwitchCase="'completed'">
              <td mat-cell *matCellDef="let element">
                <mat-icon *ngIf="element[column] == true" color="accent"
                  >done</mat-icon
                >
                <mat-icon *ngIf="element[column] == false" color="warn"
                  >schedule</mat-icon
                >
              </td></ng-container
            >

            <ng-container *ngSwitchDefault
              ><td mat-cell *matCellDef="let element">
                {{ element[column] }}
              </td></ng-container
            >
          </ng-container>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let task">
            <button
              mat-icon-button
              (click)="updteTaskStatus(task, true)"
              [disabled]="task.completed"
              matTooltip="Click to complete task"
              color="accent"
            >
              <mat-icon aria-label="Edit">done_all</mat-icon>
            </button>
            <button
              mat-icon-button
              (click)="updteTaskStatus(task, false)"
              [disabled]="!task.completed"
              matTooltip="Click to reset task"
              color="primary"
            >
              <mat-icon aria-label="Delete">autorenew</mat-icon>
            </button>
          </td>
        </ng-container>

        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef>Delete Task</th>
          <td mat-cell *matCellDef="let task">
            <button
              mat-icon-button
              (click)="deleteTask(task.id)"
              matTooltip="Click to delete task"
              color="warn"
            >
              <mat-icon aria-label="Delete">delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="fullColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: fullColumns"></tr>
      </table>

      <mat-divider></mat-divider>

      <div class="container__actions">
        <button mat-raised-button color="warn" routerLink="/">Back</button>
      </div>
    </section>
  `,
  styles: [
    `
      th,
      td {
        text-align: center;
      }
      .container {
        padding: 2rem 10rem;
        gap: 2rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        &__header {
          > span {
            font-size: 2rem;
            line-heith: 1rem;
          }

          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }

        &__actions {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
    `,
  ],
})
export class TaskDetailsComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'description', 'completed'];

  public fullColumns = [
    'id',
    'name',
    'description',
    'completed',
    'status',
    'delete',
  ];

  public selecterUserId!: number;

  public userService = inject(UserService);

  public route = inject(ActivatedRoute);

  public router = inject(Router);

  public taskService = inject(TaskService);

  public _dialog = inject(MatDialog);

  public _dialogRef = inject(MatDialogRef<AddTaskComponent>);

  public userTasks = this.taskService.userTasks;

  public selectedUserName = this.userService.selectedUserName;

  public ngOnInit(): void {
    this.selecterUserId = +this.route.snapshot.paramMap.get('id')!;

    if (this.selecterUserId) {
      this.userService.setSelectedUserId(this.selecterUserId);
    } else {
      this.router.navigateByUrl('/');
    }
  }

  public addNewTask(): void {
    this._dialogRef = this._dialog.open(AddTaskComponent, {
      width: '350px',
      height: 'auto',
      data: this.selecterUserId
    });

    this._dialogRef.componentInstance.confirmClicked
      .pipe(first())
      .subscribe((task: Task) => {
        this.taskService.addTaskStatus(task);
      });
  }

  public updteTaskStatus(task: Task, completed: boolean): void {
    this.taskService.updteTaskStatus(task, completed);
  }

  public deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}
