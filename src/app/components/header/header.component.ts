import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../../app.module';
import { AuthService } from '../../services/auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AppModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService){
  }

  public isAdmin(): boolean {
    var roles = this.authService.getRoles();
    return roles.includes('Admin') || roles.includes('SuperAdmin');
  }

  public logout(){
    this.authService.logout();
  }

  public isLogedIn(): boolean {
    return this.authService.isLogedIn();
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

    return 'Employee';
  }

}
