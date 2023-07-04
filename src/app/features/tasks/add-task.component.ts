import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <div class="container__header">
        <h2>Add new Task</h2>
      </div>
      <div class="container__form">
        <mat-form-field>
          <input [(ngModel)]="name" matInput placeholder="Name" />
        </mat-form-field>
        <mat-form-field>
          <textarea
            [(ngModel)]="description"
            matInput
            cdkTextareaAutosize
            #autosize="cdkTextareaAutosize"
            cdkAutosizeMinRows="5"
            cdkAutosizeMaxRows="20"
            placeholder="Description"
          ></textarea>
        </mat-form-field>
      </div>

      <mat-divider></mat-divider>

      <div class="container__actions">
        <button mat-dialog-close mat-raised-button color="warn">Cancel</button>
        <button
          mat-dialog-close
          mat-raised-button
          cdkFocusInitial
          color="accent"
          (click)="confirmSaveTaskHandler()"
        >
          Create
        </button>
      </div>
    </section>
  `,
  styles: [
    `
      .container {
        padding: 1rem;
        gap: 2rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        &__header {
          > span {
            self-align: flex-start;
            font-size: 2rem;
            line-heith: 1rem;
          }

          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }

        &__form {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        &__actions {
          gap: 2rem;
          display: flex;
          justify-content: space-between;
        }
      }
    `,
  ],
})
export class AddTaskComponent {

  @Output()
  public confirmClicked = new EventEmitter<Task>();

  public name = '';

  public description = '';

  public userId = inject(MAT_DIALOG_DATA);

  public confirmSaveTaskHandler(): void {

    const newTask = {
      userId: this.userId,
      name: this.name,
      description: this.description,
      completed: false
    }

    this.confirmClicked.emit(newTask);
  }
}
