import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../../app.module';
import { AuthService } from '../../services/auth-service';
import { UserModel } from '../../models/User';
import { PagedResult } from '../../models/paged-result';
import Swal from 'sweetalert2';
import { UserUpdateModel } from '../../models/user-update-model';
import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, AppModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {

  constructor(public authService: AuthService, private sharedService: SharedService) {}

  public employees?: PagedResult<UserModel>;

  public page = 1;
  public totalPages = 0;
  public totalItems = 0;

  ngOnInit(): void {
    this.getEmployees();
  }

  public changePage(page: number): void {
    this.page = page;
    this.getEmployees();
  }

  role() {
    var roles = this.authService.getRoles();
    if (roles.includes('SuperAdmin')) {
      return 'SuperAdmin';
    }
    if (roles.includes('Admin')) {
      return 'Admin';
    }
    if (roles.includes('Manager')) {
      return 'Manager';
    }

    return 'User';
  }

  private getEmployees(): void {
    console.log(this.isAdmin() || this.isSuperAdmin());

    this.authService.getEmployees(this.page, 20).subscribe((response) => {
      this.employees = response;
      this.page = response.page;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalCount;
    });
  }

  filterByUser(id: string) {
    this.selectUserIdEvent.emit(id);
  }

  @Output()
  public selectUserIdEvent: EventEmitter<string> = new EventEmitter<string>();

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

  public isMyAccount(id: string): boolean {
    return this.authService.getUserId() === id;
  }

  remove(id: string) {
    this.authService.remove(id).subscribe(res => {
      this.sharedService.toastSuccess('User removed successfully');
      this.getEmployees();
    }
    ,err => {
      this.sharedService.toastError('User remove failed');
    });
  }

  update(user: UserModel) {
    Swal.fire({
      width: 500,
      title: 'Edit user data',
      html:
        '<div class="form-group">' +
        '<input id="input-first_name" type="text" class="form-control m-2"  placeholder="FirstName" />' +
        '<input id="input-last_name" type="text" class="form-control m-2"  placeholder="LastName" />' +
        '<input id="input-username" type="text" class="form-control mb-2" placeholder="User Name" />' +
        '<input id="input-email" type="text" class="form-control mb-2" placeholder="email" />' +
        '</div>',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success btn-md',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
      didOpen: () => {
        $('#input-username').val(user.userName);
        $('#input-first_name').val(user.firstName!);
        $('#input-last_name').val(user.lastName!);
        $('#input-email').val(user.email!);
      },
      preConfirm: (result) => {
        let userName = $('#input-username').val()?.toString();
        let firstName = $('#input-first_name').val()?.toString();
        let lastName = $('#input-last_name').val()?.toString();
        let email = $('#input-email').val()?.toString();

        if(!userName?.length || !firstName?.length || !lastName?.length || !email?.length){
          this.sharedService.toastError('Please fill all fields');
          return;
        }

        var model = new UserUpdateModel(user.id,
          userName?? user.userName,
          firstName??user.firstName!,
          lastName??user.lastName!,
          email??user.email!);

          this.authService.update(model).subscribe(res => {
            this.sharedService.toastSuccess('User updated successfully');
            this.authService.refreshToken();
            this.getEmployees();
          },
          err => {
            this.sharedService.toastError('User update failed');
          });

      },
    });
  }


  refreshPassword(id: string) {
    let model = {id: id, password: ''};

    Swal.fire({
      width: 500,
      title: 'Edit Password',
      html:
        '<div class="form-group">' +
        '<input id="input-password" type="text" class="form-control m-2"  placeholder="New Password" />' +
        '</div>',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success btn-md',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
      preConfirm: (result) => {
        model = {
          id: model.id,
          password: $('#input-password').val()?.toString()??''
        }
        if(!model.password.length){
          this.sharedService.toastError('Password can not be empty');
          return;
        }

          this.authService.refreshPassword(model).subscribe(res => {
            this.sharedService.toastSuccess('Password updated successfully');
            this.authService.refreshToken();
            this.getEmployees();
          },
          err => {
            this.sharedService.toastError('Password update failed');
          });

      },
    });
  }
}
