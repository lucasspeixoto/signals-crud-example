import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import {} from '@angular/common/http';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container" *ngIf="users().length">
      <div class="container__header">
        <span>Users ({{totalUsersCount()}})</span>
      </div>
      <table mat-table [dataSource]="users()" class="mat-elevation-z8">
        <ng-container
          [matColumnDef]="column"
          *ngFor="let column of displayedColumns"
        >
          <th mat-header-cell *matHeaderCellDef>{{ column | titlecase }}</th>
          <td mat-cell *matCellDef="let element">{{ element[column] }}</td>
        </ng-container>
        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Tarefas</th>
          <td mat-cell *matCellDef="let user">
            <button
              mat-icon-button
              color="accent"
              (click)="setSelectedUserId(user.id)"
            >
              <mat-icon>search</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="fullColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: fullColumns"></tr>
      </table>
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
      }
    `,
  ],
})
export class UsersListComponent {
  public userService = inject(UserService);

  public router = inject(Router);

  public displayedColumns = ['id', 'name', 'email', 'gender'];

  public fullColumns = ['id', 'name', 'email', 'gender', 'action'];

  public users = this.userService.users;

  public totalUsersCount = this.userService.totalUsersCount;

  public setSelectedUserId(id: number): void {
    this.userService.setSelectedUserId(id);

    this.router.navigateByUrl(`tasks/${id}`);
  }
}
