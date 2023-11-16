import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../../app.module';
import { RegisterModel } from '../../models/register-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AppModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerModel: RegisterModel = new RegisterModel('', '', '', '', '', '');

  constructor(private authService: AuthService,
    private router: Router,
    private sharedService: SharedService){
  }

  private validate(): boolean {
    if (this.registerModel.email && this.registerModel.password && this.registerModel.firstName
      && this.registerModel.lastName && this.registerModel.confirmPassword) {
      if (this.registerModel.password === this.registerModel.confirmPassword) {
        return true;
      }
      else {
        this.sharedService.toastError('Passwords do not match.');
        return false;
      }
    }
    else {
      this.sharedService.toastError('Please fill all fields.');
      return false;
    }
  }

  public createEmployee() {
    if (!this.validate()) {
      return;
    }
    this.authService.register(this.registerModel).subscribe(() => {
      this.router.navigateByUrl('/');
      this.sharedService.toastSuccess('Employee created successfully.');
    }, (error) => {
      this.sharedService.toastError(' An error occurred while creating the employee.');
    });
  }

  public createManager() {
    if (!this.validate()) {
      return;
    }
    this.authService.registerManager(this.registerModel).subscribe(() => {
      this.router.navigateByUrl('/');
      this.sharedService.toastSuccess('Manager created successfully.');
    },
    (error) => {
      this.sharedService.toastError(' An error occurred while creating the manager.');
    });
  }

  public createAdmin() {
    if (!this.validate()) {
      return;
    }
    this.authService.registerAdmin(this.registerModel).subscribe(() => {
      this.router.navigateByUrl('/');
      this.sharedService.toastSuccess('Admin created successfully.');
    },
    (error) => {
      this.sharedService.toastError(' An error occurred while creating the admin.');
    });
  }

}
