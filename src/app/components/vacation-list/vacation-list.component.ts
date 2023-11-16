import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationModel } from '../../models/vacation-model';
import { VacationService } from '../../services/vacation-service';
import { AuthService } from '../../services/auth-service';
import { SharedService } from '../../services/shared-service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import $ from 'jquery';

@Component({
  selector: 'app-vacation-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './vacation-list.component.html',
  styleUrl: './vacation-list.component.css',
})
export class VacationListComponent implements OnInit, OnChanges {
  public vacations: VacationModel[] = [];
  @Input() public userId?: string;

  public page = 1;
  public totalPages = 0;
  public totalItems = 0;

  constructor(
    private vacationService: VacationService,
    private authService: AuthService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {}

  public changePage(page: number): void {
    this.page = page;
    this.getVacations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.getVacations();
    }
  }
  ngOnInit(): void {
    this.getVacations();
  }

  private getVacations(): void {
    if (this.userId) {
      console.log('getVacations', this.userId);

      this.vacationService
        .getByUserId(this.page, 20, this.userId)
        .subscribe((response) => {
          this.vacations = response.items;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalCount;
          console.log(response);
        });
    } else {
      this.vacationService.getAll(this.page, 20).subscribe((response) => {
        this.vacations = response.items;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalCount;
      });
    }
  }

  public isMyVacation(vacation: VacationModel): boolean {
    return vacation.userId === this.authService.getUserId();
  }

  public isAdmin(): boolean {
    var roles = this.authService.getRoles();
    return roles.includes('Admin');
  }

  public isManager(): boolean {
    var roles = this.authService.getRoles();
    return roles.includes('Manager');
  }

  public isSuperAdmin(): boolean {
    var roles = this.authService.getRoles();
    return roles.includes('SuperAdmin');
  }

  public isAdminOrManager(): boolean {
    return this.isAdmin() || this.isManager() || this.isSuperAdmin();
  }

  public approve(id: string): void {
    this.vacationService.approve(id).subscribe(
      (response) => {
        this.getVacations();
        this.sharedService.toastSuccess('Vacation approved successfully');
      },
      (err) => {
        this.sharedService.toastError('Vacation approve failed');
      }
    );
  }

  public reject(id: string, comment: string): void {
    this.vacationService.reject(id, comment).subscribe(
      (response) => {
        this.getVacations();
        this.sharedService.toastSuccess('Vacation rejected successfully');
      },
      (err) => {
        this.sharedService.toastError('Vacation reject failed');
      }
    );
  }

  public remove(id: string): void {
    this.vacationService.delete(id).subscribe(
      (response) => {
        this.getVacations();
        this.sharedService.toastSuccess('Vacation deleted successfully');
      },
      (err) => {
        this.sharedService.toastError('Vacation delete failed');
      }
    );
  }

  rejectModal(id: string) {
    Swal.fire({
      width: 500,
      title: 'Add the comment',
      html:
        '<div class="form-group">' +
        '<input id="input-comment" type="text" class="form-control m-2"  placeholder="FirstName" />' +
        '</div>',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success btn-md',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
      preConfirm: (result) => {
        let comment = $('#input-comment').val()?.toString();
        this.reject(id, comment ?? '');
      },
    });
  }
}
